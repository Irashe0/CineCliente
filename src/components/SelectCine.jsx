import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CineList from "../components/CinesList"


export default function CinePage() {
  const navigate = useNavigate();
  const [selectedCine, setSelectedCine] = useState(null);

  return (
    <CineList /> 
  );
}
