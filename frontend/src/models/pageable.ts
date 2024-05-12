interface Sort {
   empty: boolean,
   unsorted: boolean,
   sorted: boolean,
}
export default interface Pageable<T> {
   content: T[],
   totalElements: number,
   totalPages: number,
   last: boolean,
   size: number,
   number: number,
   sort: Sort,
   numberOfElements: number,
   first: boolean,
   empty: boolean,
}