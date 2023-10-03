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
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        })
    },
    withConfirmation: async (title: string, text: string): Promise<boolean> => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        })
        return result.isConfirmed;
    }

}

