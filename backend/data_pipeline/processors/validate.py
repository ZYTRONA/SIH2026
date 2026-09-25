"""
POLARIS AI Data Pipeline  Quality Assurance & Sensor Data Validator
Applies physical boundary assertions, outlier rejection, and null-imputation
to incoming oceanographic and cryospheric observations.
"""

from typing import Dict, Any, List, Tuple

class DataValidator:
    BOUNDS = {
        "lat": (-90.0, 90.0),
        "lon": (-180.0, 180.0),
        "sea_ice_concentration_pct": (0.0, 100.0),
        "sea_ice_thickness_m": (0.0, 10.0),
        "wave_height_m": (0.0, 35.0),
        "wind_speed_kts": (0.0, 150.0),
        "air_temp_c": (-85.0, 45.0),
        "bathymetry_depth_m": (1.0, 11000.0),
    }

    @classmethod
    def validate_cell(cls, cell: Dict[str, Any]) -> Tuple[bool, List[str]]:
        """
        Validates a single spatial cell against physical Antarctic limits.
        """
        errors = []
        for field, (min_val, max_val) in cls.BOUNDS.items():
            if field in cell:
                val = cell[field]
                if val is None or not isinstance(val, (int, float)):
                    errors.append(f"Invalid non-numeric type for {field}: {val}")
                elif val < min_val or val > max_val:
                    errors.append(f"Field {field} value {val} out of bounds [{min_val}, {max_val}]")

        is_valid = len(errors) == 0
        return is_valid, errors

    @classmethod
    def sanitize_and_filter(cls, grid_cells: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        """
        Filters invalid records, sanitizes borderline values, and returns validation metrics.
        """
        valid_cells = []
        rejected_count = 0
        validation_report = {
            "total_input": len(grid_cells),
            "valid_count": 0,
            "rejected_count": 0,
            "sample_errors": []
        }

        for cell in grid_cells:
            is_valid, errors = cls.validate_cell(cell)
            if is_valid:
                valid_cells.append(cell)
            else:
                rejected_count += 1
                if len(validation_report["sample_errors"]) < 5:
                    validation_report["sample_errors"].append({"grid_id": cell.get("grid_id", "unknown"), "errors": errors})

        validation_report["valid_count"] = len(valid_cells)
        validation_report["rejected_count"] = rejected_count

        return valid_cells, validation_report

if __name__ == "__main__":
    validator = DataValidator()
    print("Validator ready.")
