const { jsPDF } = require('jspdf');
const { Books } = require('../../db');

let pdfModule = {
  createPDF: async function (ID) {
    const book = await Books.findByPk(ID);
    const booksJSON = book.toJSON();
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: 'a4',
    });

    pdf.setTextColor(114, 213, 231);
    pdf.setFontSize(40);
    pdf.text(booksJSON.title, 1, 1);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.text(booksJSON.description, 3, 3);

    const pdfOutput = pdf.output('datauristring');
    return pdfOutput;
  },
};

module.exports = pdfModule;
