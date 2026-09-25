"""
POLARIS AI Data Pipeline  Autonomous Ingestion Scheduler
Executes automated synoptic ingest cycles (00Z, 06Z, 12Z, 18Z) or periodic intervals.
Supports asynchronous background execution and health telemetry.
"""

import time
import threading
import datetime
from typing import Callable, Optional, Dict, Any

class PipelineScheduler:
    def __init__(self, interval_seconds: int = 21600): # Default 6 hours
        self.interval_seconds = interval_seconds
        self.is_running = False
        self._thread: Optional[threading.Thread] = None
        self._stop_event = threading.Event()
        self.last_run_time: Optional[datetime.datetime] = None
        self.total_runs_completed = 0
        self.task_callback: Optional[Callable[[], Any]] = None

    def set_task(self, task_func: Callable[[], Any]):
        """Binds the pipeline execution workflow function."""
        self.task_callback = task_func

    def start(self):
        """Launches the scheduler in a dedicated background daemon thread."""
        if self.is_running:
            print("[Scheduler] Already active.")
            return

        self.is_running = True
        self._stop_event.clear()
        self._thread = threading.Thread(target=self._run_loop, daemon=True, name="POLARIS-Scheduler")
        self._thread.start()
        print(f"[Scheduler] Background pipeline daemon started (Interval: {self.interval_seconds}s)")

    def stop(self):
        """Stops the scheduler cleanly."""
        if not self.is_running:
            return
        self.is_running = False
        self._stop_event.set()
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=2.0)
        print("[Scheduler] Pipeline scheduler stopped.")

    def trigger_now(self) -> Dict[str, Any]:
        """Manually triggers an immediate ingestion cycle."""
        if self.task_callback:
            print("[Scheduler] Triggering manual execution cycle...")
            try:
                start_t = time.time()
                result = self.task_callback()
                dur = round(time.time() - start_t, 2)
                self.last_run_time = datetime.datetime.utcnow()
                self.total_runs_completed += 1
                return {"status": "SUCCESS", "duration_sec": dur, "result": result}
            except Exception as e:
                return {"status": "ERROR", "error": str(e)}
        return {"status": "NO_TASK_SET"}

    def _run_loop(self):
        # Run first ingestion immediately upon startup
        self.trigger_now()

        while not self._stop_event.is_set():
            # Wait for next interval or stop signal
            if self._stop_event.wait(timeout=self.interval_seconds):
                break
            self.trigger_now()

    def get_status(self) -> Dict[str, Any]:
        return {
            "is_running": self.is_running,
            "interval_seconds": self.interval_seconds,
            "last_run_time": self.last_run_time.isoformat() + "Z" if self.last_run_time else None,
            "total_runs_completed": self.total_runs_completed
        }

pipeline_scheduler = PipelineScheduler()

if __name__ == "__main__":
    print("Testing scheduler instantiation...")
    scheduler = PipelineScheduler(interval_seconds=10)
    scheduler.set_task(lambda: print("Sample Ingestion Run!"))
    scheduler.trigger_now()
    print("Scheduler status:", scheduler.get_status())
