import useSWR from "swr";
import api from "./api";

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildQuery(params?: QueryParams): string {
    if (!params) return "";
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) query.append(key, String(value));
    });
    return `?${query.toString()}`;
}

// Expected API response format:
// { data: T[], meta: { total: number, page: number, perPage: number } }
export function useApiIndex<T>(
    resource: string,
    params?: QueryParams
) {
    const query = buildQuery(params);
    const { data, error, mutate, isLoading } = useSWR<{ data: T[]; meta?: any }>(
        `${resource}${query}`,
        (url: string) => api.get(url).then((res) => res.data)
    );

    return {
        data: data?.data ?? [],
        meta: data?.meta,
        error,
        mutate,
        isLoading,
    };
}

export async function store<T>(resource: string, payload: Partial<T>) {
    const { data } = await api.post<T>(resource, payload);
    return data;
}

export async function update<T>(resource: string, id: string | number, payload: Partial<T>) {
    const { data } = await api.put<T>(`${resource}/${id}`, payload);
    return data;
}

export async function destroy(resource: string, ids: (string | number)[]) {
    const { data } = await api.delete(resource, { data: { ids } });
    return data;
}
