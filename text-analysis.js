document.addEventListener('DOMContentLoaded', function() {
    // Add text analysis functionality if the section exists
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeText);
    }
});

function analyzeText() {
    const text = document.getElementById('text-input').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    // Basic text statistics
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const words = text === '' ? 0 : text.split(/\s+/).length;
    const spaces = text.split(' ').length - 1;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, '').length;

    // Display basic stats
    updateTable('basic-stats', [
        ['Letters', letters],
        ['Words', words],
        ['Spaces', spaces],
        ['Newlines', newlines],
        ['Special Symbols', specialSymbols]
    ]);

    // Count pronouns
    const pronouns = ['I', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves'];
    const pronounCounts = countTokens(text, pronouns);
    updateTable('pronouns-count', pronounCounts);

    // Count prepositions
    const prepositions = ['about', 'above', 'across', 'after', 'against',
    'along', 'among', 'around', 'at', 'before',
    'behind', 'below', 'beneath', 'beside', 'between',
    'beyond', 'by', 'down', 'during', 'except',
    'for', 'from', 'in', 'inside', 'into',
    'like', 'near', 'of', 'off', 'on',
    'out', 'outside', 'over', 'past', 'since',
    'through', 'throughout', 'to', 'toward', 'under',
    'until', 'up', 'upon', 'with', 'within', 'without'];
    const prepositionCounts = countTokens(text, prepositions);
    updateTable('prepositions-count', prepositionCounts);

    // Count indefinite articles
    const articles = ['a', 'an'];
    const articleCounts = countTokens(text, articles);
    updateTable('articles-count', articleCounts);

    // Show results section
    document.getElementById('results').style.display = 'block';
}

function countTokens(text, tokens) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};

    // Initialize counts
    tokens.forEach(token => {
        counts[token.toLowerCase()] = 0;
    });

    // Count occurrences
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (counts.hasOwnProperty(lowerWord)) {
            counts[lowerWord]++;
        }
    });

    // Convert to array and filter/sort
    return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function updateTable(tableId, data) {
    const table = document.getElementById(tableId);
    // Clear previous rows (except header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add new rows
    data.forEach(([item, count]) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item;
        cell2.textContent = count;
    });

    // Add message if no data
    if (data.length === 0) {
        const row = table.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 2;
        cell.textContent = 'None found';
        cell.style.textAlign = 'center';
        cell.style.fontStyle = 'italic';
    }
}
