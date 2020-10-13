import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  savePodcast: {
    isOpen: boolean;
  };
}

const initialState: State = {
  savePodcast: {
    isOpen: false,
  },
};

type ModalIds = keyof State;

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalIds>) {
      state[action.payload].isOpen = true;
    },
    closeModal(state, action: PayloadAction<ModalIds>) {
      state[action.payload].isOpen = false;
    },
  },
});

export const { closeModal, openModal } = slice.actions;

export const modalsReducer = slice.reducer;
