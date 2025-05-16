import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Building2, Clock, Sofa, CreditCard, ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();
  
  const [progreso, setProgreso] = useState({
    cine: false,
    horario: false,
    butacas: false,
    pago: false,
  });

  useEffect(() => {
    const progresoGuardado = JSON.parse(localStorage.getItem("reservaProgreso")) || {};
    setProgreso({
      cine: progresoGuardado.cine || false,
      horario: progresoGuardado.horario || false,
      butacas: progresoGuardado.butacas || false,
      pago: progresoGuardado.pago || false,
    });
  }, [pathname]);

  const steps = [
    {
      name: "Cine",
      href: "/reserva/cine",
      icon: <Building2 className="h-5 w-5" />,
      active: pathname === "/reserva/cine",
      disabled: false,
    },
    {
      name: "Horario",
      href: `/reserva/${id}/horario`,
      icon: <Clock className="h-5 w-5" />,
      active: pathname.includes("/reserva/horario"),
      disabled: !progreso.cine,
    },
    {
      name: "Butacas",
      href: `/reserva/${id}/butacas`,
      icon: <Sofa className="h-5 w-5" />,
      active: pathname.includes("/reserva/butacas"),
      disabled: !progreso.horario,
    },
    {
      name: "Pago",
      href: `/reserva/${id}/pago`,
      icon: <CreditCard className="h-5 w-5" />,
      active: pathname.includes("/reserva/pago"),
      disabled: !progreso.butacas,
    },
  ];

  return (
    <nav aria-label="Progreso de reserva">
      <ol className="flex flex-wrap items-center justify-center gap-1 md:gap-2 text-sm md:text-base text-white">
        {steps.map((step, index) => (
          <li key={step.name} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1 md:mx-2 text-muted-foreground flex-shrink-0" />
            )}

            <div
              className={`flex items-center ${
                step.active
                  ? "text-primary font-medium"
                  : step.disabled
                  ? "text-muted-foreground cursor-not-allowed"
                  : "text-foreground"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-full p-1.5 md:p-2 ${
                  step.active ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {step.icon}
              </div>

              {step.disabled ? (
                <span className="ml-2 select-none">{step.name}</span> 
              ) : (
                <Link to={step.href} className="ml-2 text-[var(--principal)]">
                  {step.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
