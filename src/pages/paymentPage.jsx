import UserNav from '../components/navigation/userNav'
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./paymentPage.css";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // Productos y subtotal recibidos desde el carrito
  const selectedProducts = state?.selectedProducts || [];
  const subtotal = state?.subtotal || 0;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",

    entrega: "",
    direccion: "",

    pago: "",
    numeroTarjeta: "",
    banco: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const steps = [
    "Tus datos",
    "Forma de entrega",
    "Medio de pago",
    "Confirmación",
  ];

  const envio = formData.entrega === "Despacho a domicilio" ? 4990 : 0;
  const total = subtotal + envio;

  return (
  <>
      <UserNav/>
      <div className="checkout-container">

      {/* STEPPER */}
      <div className="step-by-step">
        {steps.map((item, index) => (
          <div className="step" key={index}>
            <div
              className={`circle ${
                step >= index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </div>

            <span>{item}</span>

            {index < steps.length - 1 && (
              <div
                className={`line ${
                  step > index + 1
                    ? "line-active"
                    : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* CONTENIDO */}
      <div className="payment-content">

        {/* FORMULARIO */}
        <section className="form-section">

          {/* PASO 1 */}
          {step === 1 && (
            <>
              <h2>Tus datos</h2>

              <input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />

              <input
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
              />

              <input
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
              />

              <input
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <>
              <h2>Forma de entrega</h2>

              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="Despacho a domicilio"
                  checked={
                    formData.entrega ===
                    "Despacho a domicilio"
                  }
                  onChange={handleChange}
                />
                Despacho a domicilio
              </label>

              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="Retiro en tienda"
                  checked={
                    formData.entrega ===
                    "Retiro en tienda"
                  }
                  onChange={handleChange}
                />
                Retiro en tienda
              </label>

              {formData.entrega ===
                "Despacho a domicilio" && (
                <input
                  name="direccion"
                  placeholder="Ingrese dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              )}
            </>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <>
              <h2>Método de pago</h2>

              <label>
                <input
                  type="radio"
                  name="pago"
                  value="Tarjeta"
                  checked={
                    formData.pago === "Tarjeta"
                  }
                  onChange={handleChange}
                />
                Tarjeta
              </label>

              <label>
                <input
                  type="radio"
                  name="pago"
                  value="Transferencia"
                  checked={
                    formData.pago ===
                    "Transferencia"
                  }
                  onChange={handleChange}
                />
                Transferencia
              </label>

              {formData.pago === "Tarjeta" && (
                <input
                  name="numeroTarjeta"
                  placeholder="Número de tarjeta"
                  value={
                    formData.numeroTarjeta
                  }
                  onChange={handleChange}
                />
              )}

              {formData.pago ===
                "Transferencia" && (
                <input
                  name="banco"
                  placeholder="Banco"
                  value={formData.banco}
                  onChange={handleChange}
                />
              )}
            </>
          )}

          {/* PASO 4 */}
          {step === 4 && (
            <>
              <h2>Confirmación</h2>

              <p>
                Revisa que toda la información
                sea correcta antes de finalizar.
              </p>
            </>
          )}

          {/* BOTONES */}
          <div className="buttons">
            <button
              disabled={step === 1}
              onClick={() =>
                setStep(step - 1)
              }
            >
              Volver
            </button>

            <button
              disabled={step === 4}
              onClick={() =>
                setStep(step + 1)
              }
            >
              Continuar
            </button>
          </div>
            <button className='btn-checkout' onClick={() => navigate('/cart')}>
              Volver Al Carrito
            </button>
        </section>

        {/* RESUMEN */}
        <aside className="summary">
          <h3>Resumen de compra</h3>
          <hr />

          <p>
            <strong>Nombre:</strong>{" "}
            {formData.nombre || "-"}
          </p>

          <p>
            <strong>Apellido:</strong>{" "}
            {formData.apellido || "-"}
          </p>

          <p>
            <strong>Correo:</strong>{" "}
            {formData.correo || "-"}
          </p>

          <p>
            <strong>Teléfono:</strong>{" "}
            {formData.telefono || "-"}
          </p>
          <br/>
          <hr />

          <p>
            <strong>Entrega:</strong>{" "}
            {formData.entrega || "-"}
          </p>

          {formData.direccion && (
            <p>
              <strong>Dirección:</strong>{" "}
              {formData.direccion}
            </p>
          )}

          <br/>
          <hr />

          <p>
            <strong>Pago:</strong>{" "}
            {formData.pago || "-"}
          </p>

          {formData.numeroTarjeta && (
            <p>
              <strong>Tarjeta:</strong>{" "}
              ****
              {formData.numeroTarjeta.slice(-4)}
            </p>
          )}

          {formData.banco && (
            <p>
              <strong>Banco:</strong>{" "}
              {formData.banco}
            </p>
          )}

          <br/>
          <hr />

          {/* Productos del carrito */}
          {selectedProducts.length > 0 && (
            <>
              {selectedProducts.map(p => (
                <div className="row" key={p.id}>
                  <span>{p.name} x{p.quantity}</span>
                  <span>${(p.price * p.quantity).toLocaleString('es-CL')}</span>
                </div>
              ))}
              <hr />
            </>
          )}

          <div className="row">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString('es-CL')}</span>
          </div>

          <div className="row">
            <span>Envío</span>
            <span>
              {formData.entrega === "Despacho a domicilio"
                ? "$4.990"
                : "$0"}
            </span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>${total.toLocaleString('es-CL')}</span>
          </div>
        </aside>
      </div>
    </div>
  </>
  );
}