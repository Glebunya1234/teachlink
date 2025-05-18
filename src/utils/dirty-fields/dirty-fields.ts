export function getChangedFields<T>(
    data: T,
    dirtyFields: Partial<Record<keyof T, boolean | object>>
): Partial<T> {
    return Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key as keyof T] = data[key as keyof T];
        return acc;
    }, {} as Partial<T>);
}