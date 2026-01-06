
let currentModalConfirmHandler = null;

export function showInputModal(title, defaultValue, placeholder, confirmCallback) {
    const modal = document.getElementById('input-modal');
    const input = document.getElementById('modal-input');
    const titleEl = document.getElementById('modal-title');
    const confirmBtn = document.getElementById('modal-confirm');
    const modalCheck = modal.querySelector('div');

    titleEl.textContent = title;
    input.value = defaultValue || '';
    input.placeholder = placeholder || '';

    // Clean up old handler
    if (currentModalConfirmHandler) {
        confirmBtn.removeEventListener('click', currentModalConfirmHandler);
    }

    // Define new handler
    currentModalConfirmHandler = () => {
        const val = input.value.trim();
        if (val) {
            confirmCallback(val);
            closeModal();
        }
    };

    confirmBtn.addEventListener('click', currentModalConfirmHandler);

    // Handle Enter key (remove old listeners first to be safe, though onclick overwrite handles it partially, better use pure event listener management if proper cleaner exists, but here we just overwrite onkeydown)
    input.onkeydown = (e) => {
        if (e.key === 'Enter') currentModalConfirmHandler();
        if (e.key === 'Escape') closeModal();
    };

    // Show modal
    modal.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
    modalCheck.classList.remove('scale-95');
    modalCheck.classList.add('scale-100');

    setTimeout(() => input.focus(), 50);
}

export function closeModal() {
    const modal = document.getElementById('input-modal');
    const modalCheck = modal.querySelector('div');

    modal.classList.add('opacity-0', 'pointer-events-none');
    modalCheck.classList.remove('scale-100');
    modalCheck.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}
