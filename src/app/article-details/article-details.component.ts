import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentArticle: Article = {
    
  };

constructor( private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private fb: FormBuilder) {}
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
   
    this.articleService.get 
    if (!this.viewMode) {
      this.getArticle(this.route.snapshot.params["id"]);
  
  
      this.articleService.get(this.route.snapshot.params["id"]).subscribe( ( result:any ) => {
        
        this.articleForm = new FormGroup({
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
       }); 
        } 
        
       );  
  }
  

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




}