editButtons = document.querySelectorAll('.edit-cast');

for (const button of editButtons) {
        button.addEventListener('click', () => {
            const newRole = prompt('Update Role:');
            const formInputs = {
                updated_role: newRole,
                user_id: button.id,
    };


    fetch('/update_actor', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (response.ok) {
            document.querySelector('#role').innerHTML = newRole;
        } else {
            alert('Failed to update role.')
        }
    });
});
}
    