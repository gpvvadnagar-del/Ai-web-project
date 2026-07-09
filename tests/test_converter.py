"""Simple tests for `convert_percentage` that run without pytest.

This file uses an explicit `main()` runner so it can be executed with
`python agent/tests/test_converter.py` from the repository root without
requiring `pytest` to be installed.
"""

from agent.converter import convert_percentage
import sys


def test_convert_10_point():
    assert round(convert_percentage(8.0, 10), 2) == 80.00


def test_convert_4_point():
    assert round(convert_percentage(3.2, 4), 2) == 80.00


def test_zero_scale_raises():
    try:
        convert_percentage(5, 0)
    except ValueError:
        return
    raise AssertionError("Expected ValueError for zero scale")


def test_non_numeric_raises():
    try:
        convert_percentage('a', 10)
    except ValueError:
        return
    raise AssertionError("Expected ValueError for non-numeric score")


def main():
    tests = [
        test_convert_10_point,
        test_convert_4_point,
        test_zero_scale_raises,
        test_non_numeric_raises,
    ]
    for t in tests:
        t()
    print("ALL TESTS PASSED")


if __name__ == '__main__':
    try:
        main()
    except AssertionError as e:
        print('TEST FAILED:', e)
        sys.exit(1)
    except Exception as e:
        print('ERROR RUNNING TESTS:', type(e).__name__, e)
        sys.exit(2)
