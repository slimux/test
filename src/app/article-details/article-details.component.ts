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
    this.articleService.get 
    if (!this.viewMode) {
      this.getArticle(this.route.snapshot.params["id"]);
      this.articleService.get(this.route.snapshot.params["id"]).subscribe( ( result:any ) => {

         this.articleForm = new FormGroup({
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
      });
    } );  
  }
  }

  getArticle(id: string): void {
    this.articleService.get(id)
      .subscribe({
        next: (data) => {
          this.currentArticle = data;
          console.log(data);
       
        },
        error: (e) => console.error(e)
      });
  }




}