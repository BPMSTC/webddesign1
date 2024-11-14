// Global utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`;
};

// Table functionality class
class InteractiveTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector('tbody');
        this.currentSortColumn = null;
        this.sortDirection = 'asc';
        
        this.initializeTable();
    }

    initializeTable() {
        // Add sort listeners to headers
        this.table.querySelectorAll('thead th').forEach((header, index) => {
            header.addEventListener('click', () => this.sortTable(index));
            header.style.cursor = 'pointer';
        });

        // Initialize search if search input exists
        const searchInput = document.querySelector(`#${this.table.id}Search`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchTable(e.target.value));
        }
    }

    sortTable(columnIndex) {
        const rows = Array.from(this.tbody.querySelectorAll('tr'));
        const headers = this.table.querySelectorAll('th');

        // Toggle sort direction if same column
        if (this.currentSortColumn === columnIndex) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortDirection = 'asc';
        }

        // Update sort indicators
        headers.forEach(header => header.classList.remove('sort-asc', 'sort-desc'));
        headers[columnIndex].classList.add(`sort-${this.sortDirection}`);

        // Perform sort
        rows.sort((a, b) => {
            let aVal = a.cells[columnIndex].textContent.trim();
            let bVal = b.cells[columnIndex].textContent.trim();

            // Handle different data types
            if (aVal.startsWith('$')) {
                // Currency
                aVal = parseFloat(aVal.replace(/[$,]/g, ''));
                bVal = parseFloat(bVal.replace(/[$,]/g, ''));
            } else if (aVal.endsWith('%')) {
                // Percentage
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            } else if (!isNaN(Date.parse(aVal))) {
                // Date
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else if (!isNaN(aVal)) {
                // Numbers
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            // else string comparison

            const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            return this.sortDirection === 'asc' ? comparison : -comparison;
        });

        // Reorder rows
        rows.forEach(row => this.tbody.appendChild(row));
        this.currentSortColumn = columnIndex;
    }

    searchTable(searchTerm) {
        const rows = this.tbody.querySelectorAll('tr');
        const searchLower = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = Array.from(row.cells)
                .map(cell => cell.textContent.toLowerCase())
                .join(' ');
            row.style.display = text.includes(searchLower) ? '' : 'none';
        });
    }

    updateRow(rowIndex, data) {
        const row = this.tbody.rows[rowIndex];
        if (row) {
            Object.entries(data).forEach(([key, value]) => {
                const cellIndex = this.getCellIndexByHeader(key);
                if (cellIndex !== -1) {
                    row.cells[cellIndex].textContent = value;
                }
            });
        }
    }

    getCellIndexByHeader(headerText) {
        const headers = Array.from(this.table.querySelectorAll('th'));
        return headers.findIndex(header => 
            header.textContent.toLowerCase() === headerText.toLowerCase()
        );
    }
}

// Specific table enhancements
class EsportsTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId);
        this.initializeStatusUpdates();
    }

    initializeStatusUpdates() {
        // Simulate live updates
        setInterval(() => {
            const randomRow = Math.floor(Math.random() * this.tbody.rows.length);
            const statusStates = ['Active', 'Inactive', 'Pending'];
            const newStatus = statusStates[Math.floor(Math.random() * statusStates.length)];
            
            this.updateRow(randomRow, {
                'status': newStatus,
                'win rate': `${Math.floor(Math.random() * 30 + 60)}%`
            });

            this.updateStatusStyle(this.tbody.rows[randomRow]);
        }, 5000); // Update every 5 seconds
    }

    updateStatusStyle(row) {
        const statusCell = row.querySelector('td:last-child');
        statusCell.className = ''; // Reset classes
        const status = statusCell.textContent.toLowerCase();
        statusCell.classList.add(`status-${status}`);
    }
}

class FestivalTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId);
        this.initializeFilters();
    }

    initializeFilters() {
        // Create genre filter
        const genres = new Set();
        Array.from(this.tbody.rows).forEach(row => {
            genres.add(row.cells[5].textContent); // Assuming genre is column 5
        });

        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        const genreSelect = document.createElement('select');
        genreSelect.innerHTML = '<option value="">All Genres</option>';
        genres.forEach(genre => {
            genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`;
        });

        genreSelect.addEventListener('change', (e) => this.filterByGenre(e.target.value));
        filterContainer.appendChild(genreSelect);
        this.table.parentNode.insertBefore(filterContainer, this.table);
    }

    filterByGenre(genre) {
        Array.from(this.tbody.rows).forEach(row => {
            const rowGenre = row.cells[5].textContent;
            row.style.display = genre === '' || rowGenre === genre ? '' : 'none';
        });
    }
}

class StartupTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId);
        this.initializeMultiSort();
    }

    initializeMultiSort() {
        let sortKeys = [];
        
        this.table.querySelectorAll('th').forEach((header, index) => {
            header.addEventListener('click', (e) => {
                if (e.shiftKey) {
                    // Add to multi-sort
                    const existingIndex = sortKeys.findIndex(sk => sk.column === index);
                    if (existingIndex === -1) {
                        sortKeys.push({ column: index, direction: 'asc' });
                    } else {
                        // Toggle direction
                        sortKeys[existingIndex].direction = 
                            sortKeys[existingIndex].direction === 'asc' ? 'desc' : 'asc';
                    }
                } else {
                    // Single column sort
                    sortKeys = [{ column: index, direction: 'asc' }];
                }
                
                this.multiColumnSort(sortKeys);
            });
        });
    }

    multiColumnSort(sortKeys) {
        const rows = Array.from(this.tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            for (const sort of sortKeys) {
                const comparison = this.compareCells(
                    a.cells[sort.column],
                    b.cells[sort.column]
                );
                if (comparison !== 0) {
                    return sort.direction === 'asc' ? comparison : -comparison;
                }
            }
            return 0;
        });

        rows.forEach(row => this.tbody.appendChild(row));
    }

    compareCells(cellA, cellB) {
        const aVal = cellA.textContent.trim();
        const bVal = cellB.textContent.trim();

        if (aVal.startsWith('$')) {
            return this.compareCurrency(aVal, bVal);
        } else if (aVal.endsWith('%')) {
            return this.comparePercentage(aVal, bVal);
        }
        return aVal.localeCompare(bVal);
    }

    compareCurrency(a, b) {
        return parseFloat(a.replace(/[$,]/g, '')) - parseFloat(b.replace(/[$,]/g, ''));
    }

    comparePercentage(a, b) {
        return parseFloat(a) - parseFloat(b);
    }
}

// Initialize tables when document loads
document.addEventListener('DOMContentLoaded', () => {
    const esportsTable = new EsportsTable('esportsTable');
    const festivalTable = new FestivalTable('festivalTable');
    const startupTable = new StartupTable('startupTable');

    // Example of how to trigger updates
    window.updateTable = {
        esports: (rowIndex, data) => esportsTable.updateRow(rowIndex, data),
        festival: (rowIndex, data) => festivalTable.updateRow(rowIndex, data),
        startup: (rowIndex, data) => startupTable.updateRow(rowIndex, data)
    };
});