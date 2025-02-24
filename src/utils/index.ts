export const errorMessageResolver = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    _defaultMessage?: string
  ): string => {
    return (
        error?.response?.data?.message|| 
        error?.response?.message ||
        error?.message 
    )
}
  