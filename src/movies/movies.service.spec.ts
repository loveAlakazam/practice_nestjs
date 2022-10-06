import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// *.spec.ts => 테스트를 포함한 파일이다.
/**
 * movies.controller.ts 파일을 테스트하고싶다면 movies.controller.spec.ts 가 필요
 *
 * jest가 *.spec.ts 를 찾아줌.
 *
 */

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // it: individual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(3 + 1).toEqual(4);
  });

  // getAll
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // getOne
  describe('getOne', () => {
    it('should return a Movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['actions'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID :999 not found');
      }
    });

    // deleteOne
    describe('deleteOne', () => {
      it('delete a movie', () => {
        service.create({
          title: 'Test Movie',
          genres: ['test'],
          year: new Date().getFullYear(),
        });

        const beforeDelete = service.getAll().length;
        service.deleteOne(1);
        const afterDelete = service.getAll().length;

        expect(afterDelete).toBeLessThan(beforeDelete);
      });

      it('should return a 404', () => {
        try {
          service.deleteOne(999);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    // create
    describe('create movie', () => {
      it('should create a movie', () => {
        const beforeCreate = service.getAll().length;
        service.create({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        });

        const afterCreate = service.getAll().length;
        expect(afterCreate).toBeGreaterThan(beforeCreate);
      });
    });
  });
});
