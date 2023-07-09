import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

interface WebView {
  id: string;
  name: string;
  url: string;
}

interface WebViewState {
  currentWebViewId: any;
  webViews: Array<WebView>;
}

const initialState: WebViewState = {
  webViews: [
    {
      id: '03220916-6c71-4d83-9545-487d09e8bc87',
      name: 'Google',
      url: 'https://google.com',
    },
  ],
  currentWebViewId: '03220916-6c71-4d83-9545-487d09e8bc87',
};

export const webViewSlice = createSlice({
  name: 'webViews',
  initialState,
  reducers: {
    addWebView: (state, action: PayloadAction<WebView>) => {
      state.currentWebViewId = action.payload.id;
      state.webViews.push(action.payload);
    },
    changeCurrentWebView: (state, action: PayloadAction<{ id: string }>) => {
      state.currentWebViewId = action.payload.id;
    },
  },
});

export const { addWebView, changeCurrentWebView } = webViewSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.webviews.value

export default webViewSlice.reducer;
