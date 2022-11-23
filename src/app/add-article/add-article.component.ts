import { Article } from 'src/app/models/article.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  constructor( private articleService: ArticleService, private router: Router, private fb: FormBuilder) {}
  categories  = ['Processeur', 'Carte graphique', 'Carte mère'];
  marques = ['Intel', 'AMD', 'ASUS'];
  tmemoires = [
    "DDR3",
    "DDR4"
  ]
  submitted = false;
  articleForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    desingnation: new FormControl(''),
    marque: new FormControl(''),
    modele: new FormControl(''),
    fcpu: new FormControl(''),
    core: new FormControl(''),
    threads: new FormControl(''),
    fchipset: new FormControl(''),
    overc: new FormControl(''),
    fboost: new FormControl(''),  
    chipset: new FormControl(''),
    tmemoire: new FormControl(''),
    maxram: new FormControl(''),
  });


  ngOnInit(): void {
    this.articleForm = this.fb.group(
      {
        category: ['', Validators.required],
        desingnation: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(45),
          ],
        ],
        marque: ['', Validators.required],
        modele: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(45),
          ],
        ],
        fcpu: [
          '',
          [
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        core: [
          '',
          [ 
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        threads: [
          '',
          [
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        fchipset: [
          '',
          [
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        overc: ['',[],
        ],
        fboost: ['',[Validators.pattern('^[0-9]+$'),],
        ],
        chipset: ['',[],
        ],
        tmemoire: ['',[],
      ],
        maxram: [
          '',
          [ 
            Validators.pattern('^[0-9]+$'),
          ],
        ],
      }
    );


    this.resetCompany(false);

  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.articleForm.controls;
  }

  save(): void {
    this.submitted = true;

    if (this.articleForm.invalid) {
      return;
    }

    const data = this.articleForm.value;

    this.articleService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/articles']);
        },
        error: (e) => console.error(e)
      });
}

selected = "----"

update(e: any){
  this.selected = e.target.value
}

resetCompany(b: any){

  if(this.articleForm.get('category')?.value == 'Processeur')
  { 
  this.articleForm.controls["fcpu"].setValidators([Validators.required]);
  this.articleForm.controls["threads"].setValidators([Validators.required]);
  this.articleForm.controls["core"].setValidators([Validators.required]);
  } 
  if(this.articleForm.get('category')?.value == 'Carte graphique')
  { 
  this.articleForm.controls["overc"].setValidators([Validators.required]);
  this.articleForm.controls["fchipset"].setValidators([Validators.required]);
  }
  if(this.articleForm.get('category')?.value == 'Carte mère')
  {
    this.articleForm.controls["maxram"].setValidators([Validators.required]);
    this.articleForm.controls["tmemoire"].setValidators([Validators.required]);
    this.articleForm.controls["chipset"].setValidators([Validators.required]);

  }
}

}