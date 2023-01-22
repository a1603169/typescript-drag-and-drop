namespace App {
  // Validation

  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(valirdateableInput: Validatable) {
    let isValid = true;
    if (valirdateableInput.required) {
      isValid =
        isValid && valirdateableInput.value.toString().trim().length !== 0;
    }
    if (
      valirdateableInput.minLength != null &&
      typeof valirdateableInput.value === "string"
    ) {
      isValid =
        isValid &&
        valirdateableInput.value.length >= valirdateableInput.minLength;
    }
    if (
      valirdateableInput.maxLength != null &&
      typeof valirdateableInput.value === "string"
    ) {
      isValid =
        isValid &&
        valirdateableInput.value.length <= valirdateableInput.maxLength;
    }
    if (
      valirdateableInput.min != null &&
      typeof valirdateableInput.value === "number"
    ) {
      isValid = isValid && valirdateableInput.value >= valirdateableInput.min;
    }
    if (
      valirdateableInput.max != null &&
      typeof valirdateableInput.value === "number"
    ) {
      isValid = isValid && valirdateableInput.value <= valirdateableInput.max;
    }
    return isValid;
  }
}
