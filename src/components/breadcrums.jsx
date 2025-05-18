import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Building2, Clock, Sofa, CreditCard, ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = useParams();

  const [progreso, setProgreso] = useState({
    cine: true,      // Inicialmente solo cine está true
    horario: false,
    butacas: false,
    pago: false,
  });

  useEffect(() => {
    const progresoGuardado = JSON.parse(localStorage.getItem("reservaProgreso"));
    if (!progresoGuardado) {
      // Si no hay progreso guardado, inicializa solo cine como true
      localStorage.setItem(
        "reservaProgreso",
        JSON.stringify({
          cine: true,
          horario: false,
          butacas: false,
          pago: false,
        })
      );
      setProgreso({
        cine: true,
        horario: false,
        butacas: false,
        pago: false,
      });
    } else {
      const cine = progresoGuardado.cine || false;
      const horario = cine && (progresoGuardado.horario || false);
      const butacas = horario && (progresoGuardado.butacas || false);
      const pago = butacas && (progresoGuardado.pago || false);

      setProgreso({ cine, horario, butacas, pago });
    }
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
      disabled: !progreso.horario,   
    },
    {
      name: "Butacas",
      href: `/reserva/${id}/butacas`,
      icon: <Sofa className="h-5 w-5" />,
      active: pathname.includes("/reserva/butacas"),
      disabled: !progreso.butacas,   
    },
    {
      name: "Pago",
      href: `/reserva/${id}/pago`,
      icon: <CreditCard className="h-5 w-5" />,
      active: pathname.includes("/reserva/pago"),
      disabled: !progreso.pago,     
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
                <span
                  className="ml-2 select-none"
                  aria-disabled="true"
                  tabIndex={-1}
                >
                  {step.name}
                </span>
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
