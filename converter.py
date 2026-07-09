"""Simple conversion utility for SPI/CGPA to percentage."""
from typing import Union


def convert_percentage(score: Union[int, float], scale: Union[int, float]) -> float:
    """Convert a numeric score and scale to percentage.

    Args:
        score: numeric score (e.g., SPI or CGPA)
        scale: maximum possible scale (e.g., 10 or 4)

    Returns:
        Percentage as float.

    Raises:
        ValueError: if scale is not positive.
    """
    try:
        s = float(score)
        sc = float(scale)
    except (TypeError, ValueError):
        raise ValueError("score and scale must be numeric")

    if sc <= 0:
        raise ValueError("scale must be positive")

    return (s / sc) * 100.0
