function generarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Dimensiones del rectángulo ajustadas
    const rectX = 50; // Margen izquierdo
    const rectY = 40; // Margen superior
    const rectWidth = 90; // Ancho del rectángulo (más pequeño)
    const rectHeight = 63; // Alto del rectángulo (más pequeño)

    // Dibujar el rectángulo
    pdf.setDrawColor(0); // Color negro para el borde
    pdf.setLineWidth(0.5); // Grosor del borde
    pdf.rect(rectX, rectY, rectWidth, rectHeight); // Dibujar el rectángulo

    // Añadir el logo del instituto
    const logoInstituto = "logo_instituto.png";
    pdf.addImage(logoInstituto, "PNG", rectX + 5, rectY + 5, 20, 8); // Logo más pequeño

    // Añadir el logo de la carrera seleccionada
    const carrera = document.getElementById('carrera').value;
    if (!carrera) {
        alert("Por favor selecciona una carrera antes de generar el PDF.");
        return;
    }

    const logos = {
        "Tecnología Superior en Administración": "administracion.png",
        "Tecnología Superior en Desarrollo de Software": "software.png",
        "Tecnología Superior en Turismo": "turismo.png",
        "Tecnología Superior en Educación Inicial": "educacion.png"
    };

    const logoCarrera = logos[carrera];
    if (logoCarrera) {
        pdf.addImage(logoCarrera, "PNG", rectX + rectWidth - 25, rectY + 5, 20, 8); // Logo de la carrera más pequeño
    }

    // Añadir los datos del estudiante
    pdf.setFontSize(7); // Tamaño de fuente más pequeño
    const textX = rectX + 5; // Ajuste horizontal del texto
    let textY = rectY + 15; // Nueva posición inicial del texto

    pdf.text(`Carrera: ${carrera}`, textX, textY);
    textY += 5;
    pdf.text(`Cédula: ${document.getElementById('cedula').value}`, textX, textY);
    textY += 5;
    pdf.text(`Nombres: ${document.getElementById('nombres').value}`, textX, textY);
    textY += 5;
    pdf.text(`Nivel: ${document.getElementById('nivel').value}`, textX, textY);
    textY += 5;
    pdf.text(`Paralelo: ${document.getElementById('paralelo').value}`, textX, textY);
    textY += 5;
    pdf.text(`Validez: ${document.getElementById('validez').value}`, textX, textY);

    // Añadir texto centrado en la parte inferior del cuadro negro
    const mensaje = "Esta tarjeta es de uso exclusivo de su titular y del Instituto Superior Tecnológico Tena para sus funciones y servicios institucionales.";
    pdf.setFontSize(7); // Tamaño de fuente más pequeño

    // Ajustar texto al ancho del rectángulo con margen
    const mensajeLineas = pdf.splitTextToSize(mensaje, rectWidth - 10); 
    const textoAltura = mensajeLineas.length * 5; // Altura total del texto (5px por línea)
    const mensajeX = rectX + rectWidth / 2; // Centrado horizontalmente
    const mensajeY = rectY + rectHeight - textoAltura - 5; // Cerca de la parte inferior del rectángulo

    mensajeLineas.forEach((linea, index) => {
        pdf.text(linea, mensajeX, mensajeY + index * 5, { align: 'center' });
    });

    // Añadir la foto del estudiante
    const inputFoto = document.getElementById('foto');
    if (inputFoto.files && inputFoto.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fotoDataURL = e.target.result;
            // Movemos la foto más a la derecha y ajustamos su tamaño
            const fotoWidth = 20; // Nuevo ancho de la foto
            const fotoHeight = 25; // Nueva altura de la foto
            pdf.addImage(fotoDataURL, "PNG", rectX + rectWidth - 25, rectY + 15, fotoWidth, fotoHeight); // Ajustado a la derecha
            pdf.save("Carnet.pdf"); // Guardar PDF después de añadir la foto
        };
        reader.readAsDataURL(inputFoto.files[0]);
    } else {
        // Si no hay foto, solo guardar el PDF
        pdf.save("Carnet.pdf");
    }
}
