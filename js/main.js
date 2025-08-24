document.addEventListener("DOMContentLoaded", () => {
    // --- ELEMENT SELECTORS ---
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");
    const tableBody = document.querySelector("#quotationTable tbody");
    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const finalAmountEl = document.getElementById("finalAmount");
    const balanceEl = document.getElementById("balance");
    const discountInput = document.getElementById("discountInput");
    const advanceInput = document.getElementById("advanceInput");
    const addItemBtn = document.getElementById("addItem");
    const downloadPdfBtn = document.getElementById("downloadPDF");
    const printBtn = document.getElementById("printBtn");

    // --- FUNCTIONS ---
    
    /**
     * Sets the current date and time in the document.
     */
    function setDateTime() {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString("en-CA"); // YYYY-MM-DD format
        timeEl.textContent = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // Update date and time every second
    setInterval(setDateTime, 1000);
    

    /**
     * Updates all financial calculations based on table and input values.
     */
    function updateCalculations() {
        let subtotal = 0;
        tableBody.querySelectorAll("tr").forEach(row => {
            const qty = parseFloat(row.querySelector(".qty")?.value) || 0;
            const price = parseFloat(row.querySelector(".price")?.value) || 0;
            const total = qty * price;
            row.querySelector(".total").textContent = total.toFixed(2);
            subtotal += total;
        });

        const discountPercent = parseFloat(discountInput.value) || 0;
        const discountAmount = subtotal * (discountPercent / 100);
        const finalAmount = subtotal - discountAmount;
        const advanceAmount = parseFloat(advanceInput.value) || 0;
        const balance = finalAmount - advanceAmount;

        subtotalEl.textContent = subtotal.toFixed(2);
        discountEl.textContent = discountAmount.toFixed(2);
        finalAmountEl.textContent = finalAmount.toFixed(2);
        balanceEl.textContent = balance.toFixed(2);
    }

    /**
     * Adds a new item row to the quotation table.
     */
    function addItemRow() {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="form-control form-control-sm desc" placeholder="Item Description"></td>
            <td><input type="number" class="form-control form-control-sm qty text-end" value="1" min="1"></td>
            <td><input type="number" class="form-control form-control-sm price text-end" value="0.00" min="0" step="0.01"></td>
            <td class="total text-end">0.00</td>
            <td class="action-column"><button class="btn btn-danger btn-sm remove">X</button></td>
        `;
        tableBody.appendChild(row);
        updateCalculations();
    }

    // --- EVENT LISTENERS ---
    addItemBtn.addEventListener("click", addItemRow);

    tableBody.addEventListener("input", updateCalculations);
    
    tableBody.addEventListener("click", e => {
        if (e.target.classList.contains("remove")) {
            e.target.closest("tr").remove();
            updateCalculations();
        }
    });

    discountInput.addEventListener("input", updateCalculations);
    advanceInput.addEventListener("input", updateCalculations);

    // Print Button Functionality
    printBtn.addEventListener("click", () => {
        window.print();
    });

    // Download PDF Functionality
    downloadPdfBtn.addEventListener("click", () => {
        const quotationElement = document.getElementById("quotation");
        
        const elementToPrint = quotationElement.cloneNode(true);

        const inputs = elementToPrint.querySelectorAll("input.form-control");
        inputs.forEach(input => {
            const span = document.createElement("span");
            if (input.type === 'number') {
                span.textContent = parseFloat(input.value).toFixed(2);
                span.className = 'text-end d-block';
            } else {
                 span.textContent = input.value;
            }
            input.parentNode.replaceChild(span, input);
        });

        elementToPrint.querySelector(".action-column").remove();
        elementToPrint.querySelectorAll(".remove").forEach(btn => btn.remove());

        const opt = {
            margin:       8, // Reduced margin for more space
            filename:     `Quotation-${new Date().toISOString().slice(0,10)}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(elementToPrint).save();
    });

    // --- INITIALIZATION ---
    setDateTime();
    addItemRow();
});