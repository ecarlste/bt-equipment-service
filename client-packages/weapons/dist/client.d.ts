/**
 * BaseURL is the base URL for calling the Encore application's API.
 */
export type BaseURL = string;
export declare const Local: BaseURL;
/**
 * Environment returns a BaseURL for calling the cloud environment with the given name.
 */
export declare function Environment(name: string): BaseURL;
/**
 * PreviewEnv returns a BaseURL for calling the preview environment with the given PR number.
 */
export declare function PreviewEnv(pr: number | string): BaseURL;
/**
 * Client is an API client for the bt-equipment-service-5kr2 Encore application.
 */
export default class Client {
    readonly weapons: weapons.ServiceClient;
    /**
     * Creates a Client for calling the public and authenticated APIs of your Encore application.
     *
     * @param target  The target which the client should be configured to use. See Local and Environment for options.
     * @param options Options for the client
     */
    constructor(target: BaseURL, options?: ClientOptions);
}
/**
 * ClientOptions allows you to override any default behaviour within the generated Encore client.
 */
export interface ClientOptions {
    /**
     * By default the client will use the inbuilt fetch function for making the API requests.
     * however you can override it with your own implementation here if you want to run custom
     * code on each API request made or response received.
     */
    fetcher?: Fetcher;
    /** Default RequestInit to be used for the client */
    requestInit?: Omit<RequestInit, "headers"> & {
        headers?: Record<string, string>;
    };
    /**
     * Allows you to set the authentication data to be used for each
     * request either by passing in a static object or by passing in
     * a function which returns a new object for each request.
     */
    auth?: auth.AuthParams | AuthDataGenerator;
}
export declare namespace auth {
    interface AuthParams {
        authorization: string;
    }
}
export declare namespace weapons {
    interface CreateManyWeaponsRequest {
        data: CreateWeaponDto[];
    }
    interface CreateWeaponDto {
        name: string;
        heat: string;
        damage: string;
        range: string;
        ammoPerTon: number | null;
        weight: number;
        criticalSlots: number;
        techRating: string;
        weaponType: lib.WeaponTypeEnum | null;
    }
    interface CreateWeaponRequest {
        data: CreateWeaponDto;
    }
    interface UpdateWeaponDto {
        name?: string;
        heat?: string;
        damage?: string;
        range?: string;
        ammoPerTon?: number | null;
        weight?: number;
        criticalSlots?: number;
        techRating?: string;
        weaponType?: lib.WeaponTypeEnum | null;
    }
    interface UpdateWeaponRequest {
        data: UpdateWeaponDto;
    }
    interface WeaponDto {
        id: string;
        name: string;
        heat: string;
        damage: string;
        range: string;
        ammoPerTon: number | null;
        weight: number;
        criticalSlots: number;
        techRating: string;
        weaponType: lib.WeaponTypeEnum | null;
    }
    interface WeaponResponse {
        success?: boolean;
        message?: string;
        result?: WeaponDto | WeaponDto[];
    }
    class ServiceClient {
        private baseClient;
        constructor(baseClient: BaseClient);
        create(params: CreateWeaponRequest): Promise<WeaponResponse>;
        createMany(params: CreateManyWeaponsRequest): Promise<WeaponResponse>;
        destroy(id: string): Promise<WeaponResponse>;
        read(): Promise<WeaponResponse>;
        readOne(id: string): Promise<WeaponResponse>;
        update(id: string, params: UpdateWeaponRequest): Promise<WeaponResponse>;
    }
}
export declare namespace lib {
    type WeaponTypeEnum = "ballistic" | "energy" | "missile";
}
declare class WebSocketConnection {
    ws: WebSocket;
    private hasUpdateHandlers;
    constructor(url: string, headers?: Record<string, string>);
    resolveHasUpdateHandlers(): void;
    hasUpdate(): Promise<void>;
    on(type: "error" | "close" | "message" | "open", handler: (event: any) => void): void;
    off(type: "error" | "close" | "message" | "open", handler: (event: any) => void): void;
    close(): void;
}
export declare class StreamInOut<Request, Response> {
    socket: WebSocketConnection;
    private buffer;
    constructor(url: string, headers?: Record<string, string>);
    close(): void;
    send(msg: Request): Promise<void>;
    next(): Promise<Response | undefined>;
    [Symbol.asyncIterator](): AsyncGenerator<Response, undefined, void>;
}
export declare class StreamIn<Response> {
    socket: WebSocketConnection;
    private buffer;
    constructor(url: string, headers?: Record<string, string>);
    close(): void;
    next(): Promise<Response | undefined>;
    [Symbol.asyncIterator](): AsyncGenerator<Response, undefined, void>;
}
export declare class StreamOut<Request, Response> {
    socket: WebSocketConnection;
    private responseValue;
    constructor(url: string, headers?: Record<string, string>);
    response(): Promise<Response>;
    close(): void;
    send(msg: Request): Promise<void>;
}
type CallParameters = Omit<RequestInit, "method" | "body" | "headers"> & {
    /** Headers to be sent with the request */
    headers?: Record<string, string>;
    /** Query parameters to be sent with the request */
    query?: Record<string, string | string[]>;
};
export type AuthDataGenerator = () => auth.AuthParams | Promise<auth.AuthParams | undefined> | undefined;
export type Fetcher = typeof fetch;
declare class BaseClient {
    readonly baseURL: string;
    readonly fetcher: Fetcher;
    readonly headers: Record<string, string>;
    readonly requestInit: Omit<RequestInit, "headers"> & {
        headers?: Record<string, string>;
    };
    readonly authGenerator?: AuthDataGenerator;
    constructor(baseURL: string, options: ClientOptions);
    getAuthData(): Promise<CallParameters | undefined>;
    createStreamInOut<Request, Response>(path: string, params?: CallParameters): Promise<StreamInOut<Request, Response>>;
    createStreamIn<Response>(path: string, params?: CallParameters): Promise<StreamIn<Response>>;
    createStreamOut<Request, Response>(path: string, params?: CallParameters): Promise<StreamOut<Request, Response>>;
    callTypedAPI(method: string, path: string, body?: BodyInit, params?: CallParameters): Promise<Response>;
    callAPI(method: string, path: string, body?: BodyInit, params?: CallParameters): Promise<Response>;
}
/**
 * APIErrorDetails represents the response from an Encore API in the case of an error
 */
interface APIErrorResponse {
    code: ErrCode;
    message: string;
    details?: any;
}
/**
 * APIError represents a structured error as returned from an Encore application.
 */
export declare class APIError extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    readonly status: number;
    /**
     * The Encore error code
     */
    readonly code: ErrCode;
    /**
     * The error details
     */
    readonly details?: any;
    constructor(status: number, response: APIErrorResponse);
}
/**
 * Typeguard allowing use of an APIError's fields'
 */
export declare function isAPIError(err: any): err is APIError;
export declare enum ErrCode {
    /**
     * OK indicates the operation was successful.
     */
    OK = "ok",
    /**
     * Canceled indicates the operation was canceled (typically by the caller).
     *
     * Encore will generate this error code when cancellation is requested.
     */
    Canceled = "canceled",
    /**
     * Unknown error. An example of where this error may be returned is
     * if a Status value received from another address space belongs to
     * an error-space that is not known in this address space. Also
     * errors raised by APIs that do not return enough error information
     * may be converted to this error.
     *
     * Encore will generate this error code in the above two mentioned cases.
     */
    Unknown = "unknown",
    /**
     * InvalidArgument indicates client specified an invalid argument.
     * Note that this differs from FailedPrecondition. It indicates arguments
     * that are problematic regardless of the state of the system
     * (e.g., a malformed file name).
     *
     * This error code will not be generated by the gRPC framework.
     */
    InvalidArgument = "invalid_argument",
    /**
     * DeadlineExceeded means operation expired before completion.
     * For operations that change the state of the system, this error may be
     * returned even if the operation has completed successfully. For
     * example, a successful response from a server could have been delayed
     * long enough for the deadline to expire.
     *
     * The gRPC framework will generate this error code when the deadline is
     * exceeded.
     */
    DeadlineExceeded = "deadline_exceeded",
    /**
     * NotFound means some requested entity (e.g., file or directory) was
     * not found.
     *
     * This error code will not be generated by the gRPC framework.
     */
    NotFound = "not_found",
    /**
     * AlreadyExists means an attempt to create an entity failed because one
     * already exists.
     *
     * This error code will not be generated by the gRPC framework.
     */
    AlreadyExists = "already_exists",
    /**
     * PermissionDenied indicates the caller does not have permission to
     * execute the specified operation. It must not be used for rejections
     * caused by exhausting some resource (use ResourceExhausted
     * instead for those errors). It must not be
     * used if the caller cannot be identified (use Unauthenticated
     * instead for those errors).
     *
     * This error code will not be generated by the gRPC core framework,
     * but expect authentication middleware to use it.
     */
    PermissionDenied = "permission_denied",
    /**
     * ResourceExhausted indicates some resource has been exhausted, perhaps
     * a per-user quota, or perhaps the entire file system is out of space.
     *
     * This error code will be generated by the gRPC framework in
     * out-of-memory and server overload situations, or when a message is
     * larger than the configured maximum size.
     */
    ResourceExhausted = "resource_exhausted",
    /**
     * FailedPrecondition indicates operation was rejected because the
     * system is not in a state required for the operation's execution.
     * For example, directory to be deleted may be non-empty, an rmdir
     * operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FailedPrecondition, Aborted, and Unavailable:
     *  (a) Use Unavailable if the client can retry just the failing call.
     *  (b) Use Aborted if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FailedPrecondition if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FailedPrecondition
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FailedPrecondition if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     *
     * This error code will not be generated by the gRPC framework.
     */
    FailedPrecondition = "failed_precondition",
    /**
     * Aborted indicates the operation was aborted, typically due to a
     * concurrency issue like sequencer check failures, transaction aborts,
     * etc.
     *
     * See litmus test above for deciding between FailedPrecondition,
     * Aborted, and Unavailable.
     */
    Aborted = "aborted",
    /**
     * OutOfRange means operation was attempted past the valid range.
     * E.g., seeking or reading past end of file.
     *
     * Unlike InvalidArgument, this error indicates a problem that may
     * be fixed if the system state changes. For example, a 32-bit file
     * system will generate InvalidArgument if asked to read at an
     * offset that is not in the range [0,2^32-1], but it will generate
     * OutOfRange if asked to read from an offset past the current
     * file size.
     *
     * There is a fair bit of overlap between FailedPrecondition and
     * OutOfRange. We recommend using OutOfRange (the more specific
     * error) when it applies so that callers who are iterating through
     * a space can easily look for an OutOfRange error to detect when
     * they are done.
     *
     * This error code will not be generated by the gRPC framework.
     */
    OutOfRange = "out_of_range",
    /**
     * Unimplemented indicates operation is not implemented or not
     * supported/enabled in this service.
     *
     * This error code will be generated by the gRPC framework. Most
     * commonly, you will see this error code when a method implementation
     * is missing on the server. It can also be generated for unknown
     * compression algorithms or a disagreement as to whether an RPC should
     * be streaming.
     */
    Unimplemented = "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying
     * system has been broken. If you see one of these errors,
     * something is very broken.
     *
     * This error code will be generated by the gRPC framework in several
     * internal error conditions.
     */
    Internal = "internal",
    /**
     * Unavailable indicates the service is currently unavailable.
     * This is a most likely a transient condition and may be corrected
     * by retrying with a backoff. Note that it is not always safe to retry
     * non-idempotent operations.
     *
     * See litmus test above for deciding between FailedPrecondition,
     * Aborted, and Unavailable.
     *
     * This error code will be generated by the gRPC framework during
     * abrupt shutdown of a server process or network connection.
     */
    Unavailable = "unavailable",
    /**
     * DataLoss indicates unrecoverable data loss or corruption.
     *
     * This error code will not be generated by the gRPC framework.
     */
    DataLoss = "data_loss",
    /**
     * Unauthenticated indicates the request does not have valid
     * authentication credentials for the operation.
     *
     * The gRPC framework will generate this error code when the
     * authentication metadata is invalid or a Credentials callback fails,
     * but also expect authentication middleware to generate it.
     */
    Unauthenticated = "unauthenticated"
}
export {};
