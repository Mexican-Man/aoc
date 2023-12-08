
interface ObjectConstructor {
    groupBy<T>(items: T[], callbackFn: (item: T) => string): { [key: string]: T[]; };
}