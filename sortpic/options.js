// Saves options to chrome.storage
function save_options() {
	var number_page = document.getElementById('number_page').value;
	var time_page = document.getElementById('time_page').value;
	chrome.storage.sync.set({
		number_page: number_page,
		time_page: time_page
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	});
}

// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		number_page: 3,
		time_page: 5
	}, function (items) {
		document.getElementById('number_page').value = items.number_page;
		document.getElementById('time_page').value = items.time_page;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);