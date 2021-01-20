export type TStoreContent = {
  data: Array<Object>
}

export type TStoreContext = {
  store: TStoreContent
  setStore(store: TStoreContent): void
}
