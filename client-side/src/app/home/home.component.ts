import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Note } from '../shared/note';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NotesService]
})
export class HomeComponent implements OnInit {

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.resetForm();
    this.notesList();
  }
    // tslint:disable-next-line: typedef
    resetForm(form?: NgForm)
    {
      if (form) {
        form.reset();
        this.notesService.selectedNote = {
          _id: '',
          title: '',
          description: ''
        };
      }
    }

    // tslint:disable-next-line: typedef
    notesList()
    {
      this.notesService.getNote().subscribe((notes) => {
        this.notesService.notes = notes;
      });
    }

    // tslint:disable-next-line: typedef
    onSubmit(form: NgForm)
    {
      // tslint:disable-next-line: triple-equals
      if (form.value._id == '')
      {
        this.notesService.postNote(form.value).subscribe((notes) => {
          this.resetForm(form);
          this.notesList();
        });
      }
      else
      {
        this.notesService.putNote(form.value)
          .subscribe((res) =>
          {
              this.resetForm(form);
              this.notesList();
          });
      }

    }

    // tslint:disable-next-line: typedef
  onEdit(note: Note)
  {
      this.notesService.selectedNote = note;
  }

  // tslint:disable-next-line: typedef variable-name
  onDelete(_id: string, form: NgForm)
  {
    // tslint:disable-next-line: triple-equals
    if (confirm('Are you sure to delete?') == true) {
      this.notesService.deleteNote(_id).subscribe(() => {
        this.notesList();
        this.resetForm(form);
      });
    }
  }
}
