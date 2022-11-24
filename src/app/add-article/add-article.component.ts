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
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ],
        core: [
          '',
          [ 
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ],
        threads: [
          '',
          [
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ],
        fchipset: [
          '',
          [
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ],
        overc: ['',[Validators.required],
        ],
        fboost: ['',[Validators.pattern('^[0-9]+$'),],
        ],
        chipset: ['',[Validators.required],
        ],
        tmemoire: ['',[Validators.required],
      ],
        maxram: [
          '',
          [ 
            Validators.pattern('^[0-9]+$'),Validators.required
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
  this.articleForm.controls["fcpu"].enable()
  this.articleForm.controls["core"].enable()
  this.articleForm.controls["threads"].enable()

  this.articleForm.controls["fchipset"].disable()
  this.articleForm.controls["overc"].disable()
  this.articleForm.controls["fboost"].disable()

  this.articleForm.controls["maxram"].disable()
  this.articleForm.controls["tmemoire"].disable()
  this.articleForm.controls["chipset"].disable()
  } 
  if(this.articleForm.get('category')?.value == 'Carte graphique')
  { 
    this.articleForm.controls["fcpu"].disable()
    this.articleForm.controls["core"].disable()
    this.articleForm.controls["threads"].disable()
  
    this.articleForm.controls["fchipset"].enable()
    this.articleForm.controls["overc"].enable()
    this.articleForm.controls["fboost"].enable()
  
    this.articleForm.controls["maxram"].disable()
    this.articleForm.controls["tmemoire"].disable()
    this.articleForm.controls["chipset"].disable()
  }
  if(this.articleForm.get('category')?.value == 'Carte mère')
  {
    this.articleForm.controls["fcpu"].disable()
    this.articleForm.controls["core"].disable()
    this.articleForm.controls["threads"].disable()
  
    this.articleForm.controls["fchipset"].disable()
    this.articleForm.controls["overc"].disable()
    this.articleForm.controls["fboost"].disable()
  
    this.articleForm.controls["maxram"].enable()
    this.articleForm.controls["tmemoire"].enable()
    this.articleForm.controls["chipset"].enable() 

  }
}

}