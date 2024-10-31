import { create } from 'zustand';

// Define a store
const useUtilStore = create((set) => ({
  loaderCount: 0,
  uploadProgress: 0,
  increaseLoaderCount: () => set((state) => ({ loaderCount: state.loaderCount + 1 })),
  decreaseLoaderCount: () => set((state) => ({ loaderCount: state.loaderCount - 1 })),
  setUploadProgress: (value) => set((state) => ({ uploadProgress: value }))
}));

export default useUtilStore;
