import UserNav from '../components/navigation/userNav'
import FooterUsers from '../components/navigation/footerUsers';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./paymentPage.css";

const BANCOS = [
  "Banco de Chile",
  "BancoEstado",
  "Santander",
  "BCI",
  "Itaú",
  "Scotiabank",
  "BICE",
  "Security",
  "Falabella",
  "Ripley",
];

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

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
    banco: "",
    tipotarjeta: "",
    numeroTarjeta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const steps = ["Tus datos", "Forma de entrega", "Medio de pago", "Confirmación"];

  const envio = formData.entrega === "Despacho a domicilio" ? 4990 : 0;
  const total = subtotal + envio;

  return (
    <>
      <div className="checkout-container">

        {/* STEPPER */}
        <div className="step-by-step">
          {steps.map((item, index) => (
            <div className="step" key={index}>
              <div className={`circle ${step >= index + 1 ? "active" : ""}`}>
                {index + 1}
              </div>
              <span>{item}</span>
              {index < steps.length - 1 && (
                <div className={`line ${step > index + 1 ? "line-active" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* CONTENIDO */}
        <div className="payment-content">

          {/* COLUMNA IZQUIERDA */}
          <div className="form-col">

            <section className="form-section">
              {/* PASO 1 */}
              {step === 1 && (
                <>
                  <h2>Tus datos</h2>
                  <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                  <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
                  <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
                  <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
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
                      checked={formData.entrega === "Despacho a domicilio"}
                      onChange={handleChange}
                    />
                    Despacho a domicilio:  + $4.990
                  </label>

                  {formData.entrega === "Despacho a domicilio" && (
                    <input
                      name="direccion"
                      placeholder="Ingrese dirección"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="input-direccion"
                    />
                  )}

                  <label>
                    <input
                      type="radio"
                      name="entrega"
                      value="Retiro en tienda"
                      checked={formData.entrega === "Retiro en tienda"}
                      onChange={handleChange}
                    />
                    Retiro en tienda
                  </label>
                  {formData.entrega === "Retiro en tienda" &&(
                    <p style={{marginLeft: "26px", color: "#555", fontSize: "0.9rem"}}>
                      📍 Dirección de la tienda: <strong>Antonio Varas 880, Providencia</strong>
                    </p>
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
                      checked={formData.pago === "Tarjeta"}
                      onChange={handleChange}
                    />
                    Tarjeta
                  </label>

                  {formData.pago === "Tarjeta" && (
                    <div className="tarjeta-options">
                      {/* Banco y tipo juntos en la misma fila */}
                      <div className="tarjeta-options-row">
                        <select
                          name="banco"
                          value={formData.banco}
                          onChange={handleChange}
                          className="select-field"
                        >
                          <option value="">Selecciona tu banco</option>
                          {BANCOS.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>

                        <select
                          name="tipotarjeta"
                          value={formData.tipotarjeta}
                          onChange={handleChange}
                          className="select-field"
                        >
                          <option value="">Tipo de tarjeta</option>
                          <option value="Débito">Débito</option>
                          <option value="Crédito">Crédito</option>
                        </select>
                      </div>

                      {/* Número de tarjeta abajo */}
                      <input
                        name="numeroTarjeta"
                        placeholder="Número de tarjeta"
                        value={formData.numeroTarjeta}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <label>
                    <input
                      type="radio"
                      name="pago"
                      value="Transferencia"
                      checked={formData.pago === "Transferencia"}
                      onChange={handleChange}
                    />
                    Transferencia
                  </label>
                  {formData.pago === "Transferencia" &&(
                    <p style={{marginLeft: "26px", color: "#555", fontSize: "0.9rem"}}>
                      <strong>Datos Bancarios:</strong>
                      <p>Nativo Cosmetics SPA</p>
                      <p>77.357-312-7</p>
                      <p>Banco BCI</p>
                      <p>Cuenta Corriente</p>
                      <p>53568-77891-12345</p>
                      <p>transferencias@nativo-cosmetics.com</p>
                    </p>
                  )}

                </>
              )}

              {/* PASO 4 */}
              {step === 4 && (
                <>
                  <h2>Confirmación</h2>
                  <p>Revisa que toda la información sea correcta antes de finalizar.</p>
                </>
              )}

              {/* BOTONES */}
              <div className="buttons">
                <button disabled={step === 1} onClick={() => setStep(step - 1)}>Volver</button>
                <button disabled={step === 4} onClick={() => setStep(step + 1)}>Continuar</button>
              </div>
            </section>

            {/* BOTÓN VOLVER AL CARRITO */}
            <button className="btn-back-cart" onClick={() => navigate('/user/cart')}>
              ← Volver al carrito
            </button>
          </div>

          {/* RESUMEN */}
          <aside className="summary">
            <h3>Resumen de compra</h3>
            <hr />
            <p><strong>Nombre:</strong> {formData.nombre || "-"}</p>
            <p><strong>Apellido:</strong> {formData.apellido || "-"}</p>
            <p><strong>Correo:</strong> {formData.correo || "-"}</p>
            <p><strong>Teléfono:</strong> {formData.telefono || "-"}</p>
            <br/>
            <hr />
            <p><strong>Entrega:</strong> {formData.entrega || "-"}</p>
            {formData.direccion && <p><strong>Dirección:</strong> {formData.direccion}</p>}
            <br />
            <hr />
            <p><strong>Pago:</strong> {formData.pago || "-"}</p>
            {formData.banco && <p><strong>Banco:</strong> {formData.banco}</p>}
            {formData.tipotarjeta && <p><strong>Tipo:</strong> {formData.tipotarjeta}</p>}
            {formData.numeroTarjeta && <p><strong>Tarjeta:</strong> ****{formData.numeroTarjeta.slice(-4)}</p>}
            <br />
            <hr />

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
              <span>{formData.entrega === "Despacho a domicilio" ? "$4.990" : "$0"}</span>
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