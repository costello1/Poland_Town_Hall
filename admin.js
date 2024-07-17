document.addEventListener('DOMContentLoaded', () => {
    const resetVotesButton = document.getElementById('resetVotes');
    const downloadExcelButton = document.getElementById('downloadExcel');
    const clearExcelButton = document.getElementById('clearExcel');

    resetVotesButton.addEventListener('click', async () => {
        const response = await fetch(`https://adminapi-7524dbiyoq-uc.a.run.app/reset-users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('All users can now vote again.');
        } else {
            alert('Error resetting votes.');
        }
    });

    downloadExcelButton.addEventListener('click', async () => {
        const response = await fetch(`https://adminapi-7524dbiyoq-uc.a.run.app/download-excel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'responses.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            alert('Error downloading the Excel file.');
        }
    });

    clearExcelButton.addEventListener('click', async () => {
        const confirmation = confirm('Are you sure you want to clear the Excel file? This action cannot be undone.');
        if (confirmation) {
            const response = await fetch(`https://adminapi-7524dbiyoq-uc.a.run.app/clear-excel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Excel file has been cleared.');
            } else {
                alert('Error clearing the Excel file.');
            }
        }
    });
});
