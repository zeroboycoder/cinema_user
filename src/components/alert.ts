import { toast } from "react-hot-toast"

/**
 * Error handling fix for `toast.promise()`
 * @see {@link https://github.com/timolins/react-hot-toast/issues/157}
 */
// @ts-ignore
export const lazyToast: typeof toast.promise = (...args) => {
    try {
        return toast.promise(...args)
    } catch {
        // empty
    }
}

export default lazyToast