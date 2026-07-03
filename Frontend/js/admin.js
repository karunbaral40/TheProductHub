
function confirmDelete(productId) {
    if (confirm(`Are you sure you want to delete Product ID #${productId}?`)) {
        fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Product deleted successfully!');
                location.reload(); // Refresh the list
            } else {
                alert('Failed to delete product.');
            }
        });
    }
}