import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userId en useEffect:", userId);

        if (!userId) {
            console.error("User ID no encontrado");
            navigate("/login");
        } else {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`https://laravelcine-cine-zeocca.laravel.cloud/api/usuarios/${userId}`);
                    const data = await response.json();

                    if (response.ok) {
                        setUser(data);
                    } else {
                        throw new Error(data.message || "Error en la solicitud");
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    navigate("/login");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUser();
        }
    }, [userId, navigate]);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {user ? (
                <>
                    <h1 className="text-3xl font-semibold">Bienvenido, {user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Fecha de registro: {new Date(user.createdAt).toLocaleDateString()}</p>
                </>
            ) : (
                <p>No se pudo cargar la información del usuario.</p>
            )}
        </div>
    );
};

export default Dashboard;
