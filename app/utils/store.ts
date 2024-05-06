import { StoreApi, UseBoundStore, create } from 'zustand'

import { combine } from 'zustand/middleware'


type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {} as WithSelectors<typeof _store>['use']
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

export const useImageDataBase = create(
  combine(
    {
      image: '',
      imageLoadedCallback: [] as (() => void)[],
      mainColor: '',
    },
    (set) => ({
      setImage: (image: string) => set({ image }),
      addImageLoadedCallback: (imageLoadedCallback: () => void) => {
        set((state) => {
          return { ...state, imageLoadedCallback: [...state.imageLoadedCallback, imageLoadedCallback] }
        })
        return () => {
          set((state) => {
            return { ...state, imageLoadedCallback: state.imageLoadedCallback.filter((cb) => cb !== imageLoadedCallback) }
          })
        }
      },
      setMainColor: (mainColor: string) => set({ mainColor }),
      clear: () => set({ image: '', mainColor: ''})
    }),
  )
)

export const useImageData = createSelectors(useImageDataBase)
