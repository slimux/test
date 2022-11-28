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
    caracteristiques: new FormGroup({
      fcpu: new FormControl(''),
      core: new FormControl(''),
      threads: new FormControl(''),
    }),
    chipsetgraphique: new FormGroup({
      fchipset: new FormControl(''),
      overc: new FormControl(''),
      fboost: new FormControl(''),  
    }),
    caracteristiques1: new FormGroup({
          chipset: new FormControl(''),
          tmemoire: new FormControl(''),
          maxram: new FormControl(''),
    })
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
            Validators.maxLength(45)
            
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
        ],    caracteristiques : this.fb.group(
          {
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
        ],    }
        ),   chipsetgraphique : this.fb.group(
          {
        fchipset: [
          '',
          [
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ],
        overc: ['',[Validators.required],
        ],
        fboost: ['',[Validators.pattern('^[0-9]+$'),], 
        ],   }
        ),  
        caracteristiques1 : this.fb.group(
          {
        chipset: ['',[Validators.required],
        ],
        tmemoire: ['',[Validators.required],
      ],
        maxram: [
          '',
          [ 
            Validators.pattern('^[0-9]+$'),Validators.required
          ],
        ]  }
        )
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
  this.articleForm.controls["caracteristiques"].enable()

  this.articleForm.controls["chipsetgraphique"].disable()

  this.articleForm.controls["caracteristiques1"].disable()

  } 
  if(this.articleForm.get('category')?.value == 'Carte graphique')
  { 
    this.articleForm.controls["caracteristiques"].disable()

    this.articleForm.controls["chipsetgraphique"].enable()
  
    this.articleForm.controls["caracteristiques1"].disable()
  }
  if(this.articleForm.get('category')?.value == 'Carte mère')
  {
    this.articleForm.controls["caracteristiques"].disable()

    this.articleForm.controls["chipsetgraphique"].disable()
  
    this.articleForm.controls["caracteristiques1"].enable()

  }
}

}