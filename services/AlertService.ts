import Swal from "sweetalert2";

export const AlertService = {
    message: (text: string) => {
        Swal.fire(text);
    },
    question: (title: string, text: string) => {
        Swal.fire(title, text, 'question');
    },
    error: (title: String, text: string, footer?: string) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: footer
        })

    },
    success: (title: string) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    }

}

