
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {


 id: any
  categories  = ['Processeur', 'Carte graphique', 'Carte mère'];
  marques = ['Intel', 'AMD', 'ASUS'];
  tmemoires = ["DDR3","DDR4"]
  submitted = false;


constructor( private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private fb: FormBuilder) {}
editarticleForm: FormGroup = new FormGroup({
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


selected = "----"

  update(e: any){
    this.selected = e.target.value
  }


  ngOnInit(): void {
    this.resetCompany(false)
    this.id = this.route.snapshot.params["id"]
    this.editarticleForm = this.fb.group(
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
        fcpu: ['',[Validators.pattern('^[0-9]+$'),],],
        core: ['',[ Validators.pattern('^[0-9]+$'),],],
        threads: ['',[Validators.pattern('^[0-9]+$'),],],
        fchipset: ['',[Validators.pattern('^[0-9]+$'),],],
        overc: ['',[],],
        fboost: ['',[Validators.pattern('^[0-9]+$'),],],
        chipset: ['',[],],
        tmemoire: ['',[],],
        maxram: ['',[  Validators.pattern('^[0-9]+$'),],],
      });

  
        this.articleService.get(this.route.snapshot.params["id"]).subscribe( ( result:any ) => {
        this.editarticleForm = new FormGroup({
         id: new FormControl(result['id']),
         category: new FormControl(result['category']),
         desingnation: new FormControl(result['desingnation']),
         marque: new FormControl(result['marque']),
         modele: new FormControl(result['modele']),
         fcpu: new FormControl(result['fcpu']),
         core: new FormControl(result['core']),
         threads: new FormControl(result['threads']),
         fchipset: new FormControl(result['fchipset']),
         overc: new FormControl(result['overc']),
         fboost: new FormControl(result['fboost']),
         chipset: new FormControl(result['chipset']),
         tmemoire: new FormControl(result['tmemoire']),
         maxram: new FormControl(result['maxram']),

       });   } 
       );  
    
  } 


  get f(): { [key: string]: AbstractControl } {
    return this.editarticleForm.controls;
  }

    updateArticle(): void {
    this.submitted = true;
    if (this.editarticleForm.invalid) {
      return;
    } else{  this.articleService.update(this.id, this.editarticleForm.value)     
      .subscribe({
          next: (res) => {
            this.router.navigate(['/articles']);
          },
          error: (e) => console.error(e)
        });}
  

}

resetCompany(b: any){

  if(this.editarticleForm.get('category')?.value == 'Processeur')
  { 
  this.editarticleForm.controls["fcpu"].setValidators([Validators.required]);
  this.editarticleForm.controls["threads"].setValidators([Validators.required]);
  this.editarticleForm.controls["core"].setValidators([Validators.required]);
  } 
  if(this.editarticleForm.get('category')?.value == 'Carte graphique')
  { 

  this.editarticleForm.controls["overc"].setValidators([Validators.required]);
  this.editarticleForm.controls["fchipset"].setValidators([Validators.required]);
  }
  if(this.editarticleForm.get('category')?.value == 'Carte mère')
  {
    this.editarticleForm.controls["maxram"].setValidators([Validators.required]);
    this.editarticleForm.controls["tmemoire"].setValidators([Validators.required]);
    this.editarticleForm.controls["chipset"].setValidators([Validators.required]);
  }
}
  
 }