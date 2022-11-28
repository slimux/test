
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
  @Input() currentArticle: Article = {
    
  };


constructor( private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private fb: FormBuilder) {}
editarticleForm: FormGroup = new FormGroup({
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


selected = "----"

  update(e: any){
    this.selected = e.target.value
  }


  ngOnInit(): void {
   

    this.id = this.route.snapshot.params["id"]
    this.getArticle(this.route.snapshot.params["id"]);
        this.articleService.get(this.route.snapshot.params["id"]).subscribe( ( result:any ) => {
        this.editarticleForm = new FormGroup({
         id: new FormControl(result['id']),
         category: new FormControl(result['category']),
         desingnation: new FormControl(result['desingnation']),
         marque: new FormControl(result['marque']),
         modele: new FormControl(result['modele']),
         caracteristiques : this.fb.group(
          {
            fcpu: new FormControl(this.currentArticle.caracteristiques?.fcpu),
            core: new FormControl(this.currentArticle.caracteristiques?.core),
            threads: new FormControl(this.currentArticle.caracteristiques?.threads),  }
            ),  chipsetgraphique : this.fb.group(
             {
            fchipset: new FormControl(this.currentArticle.chipsetgraphique?.fchipset),
            overc: new FormControl(this.currentArticle.chipsetgraphique?.overc),
            fboost: new FormControl(this.currentArticle.chipsetgraphique?.fboost),  }
            ),    caracteristiques1 : this.fb.group(
             {
            chipset: new FormControl(this.currentArticle.caracteristiques1?.chipset),
            tmemoire: new FormControl(this.currentArticle.caracteristiques1?.tmemoire),
            maxram: new FormControl(this.currentArticle.caracteristiques1?.maxram),
           }
        )
       });   } 
       );  
       this.resetCompany(false);
  } 

  getArticle(id: string): void {
    this.articleService.get(id)
      .subscribe({
        next: (data) => {
          this.currentArticle = data;
          console.log(data);
          console.log();
        },
        error: (e) => console.error(e)
      });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.editarticleForm.controls;
  }

    updateArticle(): void {
   
      this.submitted = true;

      if (this.editarticleForm.invalid) {
        return;
      }
     this.articleService.update(this.id, this.editarticleForm.value)     
      .subscribe({
          next: (res) => {
            this.router.navigate(['/articles']);
          },
          error: (e) => console.error(e)
        });

}
resetCompany(b: any){

  if(this.editarticleForm.get('category')?.value == 'Processeur')
  { 
  this.editarticleForm.controls["caracteristiques"].enable()

  this.editarticleForm.controls["chipsetgraphique"].disable()

  this.editarticleForm.controls["caracteristiques1"].disable()

  } 
  if(this.editarticleForm.get('category')?.value == 'Carte graphique')
  { 
    this.editarticleForm.controls["caracteristiques"].disable()

    this.editarticleForm.controls["chipsetgraphique"].enable()
  
    this.editarticleForm.controls["caracteristiques1"].disable()
  }
  if(this.editarticleForm.get('category')?.value == 'Carte mère')
  {
    this.editarticleForm.controls["caracteristiques"].disable()

    this.editarticleForm.controls["chipsetgraphique"].disable()
  
    this.editarticleForm.controls["caracteristiques1"].enable()

  }
}
  
 }