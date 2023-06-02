import Swal from 'sweetalert2';

export default function showError(){
    Swal.fire({
        icon: 'error',
        title: 'Fields missing',
        text: 'Please select all field prior to submission!',
    })
}