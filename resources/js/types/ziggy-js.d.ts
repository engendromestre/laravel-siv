// resources/js/types/ziggy-js.d.ts
declare module 'ziggy-js' {
    export function route(
        name: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: any,
        absolute?: boolean,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config?: any,
    ): string;

    export type RouteName = string;
}
