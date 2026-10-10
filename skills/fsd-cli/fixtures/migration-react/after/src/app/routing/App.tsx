import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CatalogPage } from "../../pages/catalog";
export function App() { return <BrowserRouter><Routes><Route path="/catalog" element={<CatalogPage />} /><Route path="*" element={<p>Not found</p>} /></Routes></BrowserRouter>; }
