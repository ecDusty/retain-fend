$(function(){

	var model = {
		init: function() {
			if (!localStorage.notes) {
				localStorage.notes = JSON.stringify([]);
			}
		},

		add: function(obj) {
			var data = JSON.parse(localStorage.notes);
			data.push(obj);
			localStorage.notes = JSON.stringify(data);
		},

		getAllNotes: function() {
			return JSON.parse(localStorage.notes);
		},

		clearAllNotes: function() {
			localStorage.clear();
			model.init();
		}
	};


	var octopus = {
		addNewNote: function(noteStr) {
			var d = new Date();
			model.add({
				content: noteStr,
				date: d.toUTCString()
			});
			view.render();
		},

		getNotes: function() {
			return model.getAllNotes().reverse();
		},

		clearNotes: function() {
			model.clearAllNotes();
			view.render();
		},

		init: function() {
			model.init();
			view.init();
		}
	};


	var view = {
		init: function() {
			this.noteList = $('#notes');
			var newNoteForm = $('#new-note-form');
			var newNoteContent = $('#new-note-content');
			var clearButton = $('#clear-button');

			newNoteForm.submit(function(e){
				octopus.addNewNote(newNoteContent.val());
				newNoteContent.val('');
				e.preventDefault();
			});

			clearButton.click(function() {
			  octopus.clearNotes();
			});

			view.render();
		},
		render: function(){
			var htmlStr = '';
			octopus.getNotes().forEach(function(note){
				htmlStr += '<li class="note">'+
						note.content + '<p class="note-date">' +
						note.date + '</p>'
					'</li>';
			});
			this.noteList.html( htmlStr );
		}
	};

	octopus.init();
});
