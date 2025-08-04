export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error?: string;
    private readonly _value?: T;

    private constructor(isSuccess: boolean, error?: string, value?: T) {
        if (isSuccess && error) {
            throw new Error("No puede haber error en una operación exitosa.");
        }
        if (!isSuccess && !error) {
            throw new Error("Debe proporcionar un mensaje de error para una operación fallida.");
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error("No se puede obtener el valor de un resultado fallido.");
        }
        return this._value!;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}
