export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo toma implementar GEN.AI?',
    answer:
      'La implementación estándar toma entre 24 y 48 horas hábiles. Incluye configuración de especialidades, profesionales, horarios, integración con WhatsApp Business y capacitación para tu equipo administrativo.',
  },
  {
    question: '¿Necesito instalar algún software en las computadoras?',
    answer:
      'No. GEN.AI es 100% web y funciona desde cualquier navegador moderno. También es completamente responsive, por lo que puedes acceder desde tablets y celulares sin problemas.',
  },
  {
    question: '¿Se integra con mi sistema de historias clínicas actual?',
    answer:
      'Sí. GEN.AI se integra con los principales sistemas de historias clínicas (HIS) mediante API REST. También ofrecemos integración con Google Calendar, Outlook y sistemas personalizados.',
  },
  {
    question: '¿Cómo funciona el chatbot de WhatsApp?',
    answer:
      'Utilizamos la API oficial de WhatsApp Business con inteligencia artificial que comprende lenguaje natural. El paciente escribe como lo haría con una persona y el bot guía la conversación para agendar, cancelar o reprogramar citas.',
  },
  {
    question: '¿Mis datos y los de mis pacientes están seguros?',
    answer:
      'Absolutamente. Utilizamos cifrado AES-256 en tránsito y reposo, servidores con certificación ISO 27001 y cumplimos con normativas de protección de datos de salud. Realizamos respaldos automáticos cada 6 horas.',
  },
  {
    question: '¿Ofrecen soporte técnico en español?',
    answer:
      'Sí. Contamos con soporte técnico en español de lunes a viernes de 8:00 AM a 6:00 PM (hora Colombia). Además, disponemos de chat en vivo, base de conocimiento y videos tutoriales.',
  },
  {
    question: '¿Puedo probar GEN.AI antes de contratar?',
    answer:
      'Por supuesto. Ofrecemos una demo personalizada donde configuramos un entorno de prueba con los datos de tu clínica para que veas el sistema en acción con casos reales.',
  },
];
