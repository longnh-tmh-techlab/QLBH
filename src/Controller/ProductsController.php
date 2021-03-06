<?php
declare(strict_types=1);

namespace App\Controller;
use Cake\ORM\Locator\LocatorAwareTrait;
use Cake\Model\Table\ColorsProductsSizes;
use Cake\Model\Table\CategoriesProducts;
use Cake\Filesystem\File;
use Cake\Datasource\ConnectionManager;
use Cake\ORM\Query;

/**
 * Products Controller
 *
 * @property \App\Model\Table\ProductsTable $Products
 * @method \App\Model\Entity\Product[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ProductsController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        $this->loadComponent('MyAuth');
    }
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("CategoriesProducts");
        // debug($this->request->getSession()->read('email'));
        // debug($this->request->getCookie('position'));
        // if( $this->request->getCookie('email') !== $this->request->getSession()->read('email')){
        // //     $this->response = $this->response->withStringBody(json_encode(array_map($mapFunc, $products)));
        // // $this->response = $this->response->withType('json');
        // return $this->response->withStringBody(json_encode(['status' => false]))->withType('json');
        // }
        if($this->MyAuth->staffAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $mapFunc = function ( $product) {
            //Add inventory property to product
            // $colors_products_sizes= $this->ColorsProductsSizes->find()->contain(['Colors','Sizes'])->where(['product_id' => $product->id] )->toArray();
            // if(!empty($colors_products_sizes) ){
            //     $sizeObject = array(

            //         "size" =>$colors_products_sizes[0]['size']['name'] ,
            //         "colors" => []
            //     );
            //     $sizesArray = [];
            //     $colorObject = ['color' => '', 'count' => 0];
            //     $colorsArray = array();
            //     $current_size = $colors_products_sizes[0]['size']['name'];
            //     foreach($colors_products_sizes as $cps) {

            //         if($current_size != $cps['size']['name']){
            //             $sizeObject['colors'] = $colorsArray;
            //             array_push($sizesArray,$sizeObject);
            //             $colorsArray = array();
            //             $current_size = $cps['size']['name'];
            //             $sizeObject['colors'] = [];
            //             $sizeObject['size']= $cps['size']['name'];

            //         }
            //         $colorObject['color'] = $cps['color']['name'];
            //         $colorObject['count'] = $cps['count'];
            //         array_push($colorsArray, $colorObject);

            //     }
            //     $sizeObject['colors'] = $colorsArray;
            //     array_push($sizesArray,$sizeObject);
            //     $colorsArray = array();
            //     // debug($sizesArray);
            //     $product['inventory']=  $sizesArray;
            //     // debug($product);
            // }else {
            //     $product['inventory'] = [];
            // }

            //

            //Add Categories property to $product;
            $categories_products = $this->CategoriesProducts->find()->where(["product_id" => $product["id"]])->contain("Categories")->toArray();
            $categoriesArray = [];

            foreach( $categories_products as $cp){
                $categoryOfProduct= array(
                    'id' => $cp['category']['id'],
                    'name' => $cp['category']['name']
                );
                array_push($categoriesArray, $categoryOfProduct);
            };

            $product['categories']= $categoriesArray;

            $product['manufacturer']= array(
                'id'  => $product["manufacturer"]['id'],
                'name' => $product["manufacturer"]["name"]
            );
            unset($product["manufacturer_id"]);
            unset($product["state_id"]);
            return $product;
        };
        $products = $this->Products->find('all')->contain(['Manufacturers', 'ProductStates'])->toArray();
        foreach($products as $product){
            $product['image'] = 'http://localhost:8765/img/'.$product['image'];
        }

        $this->response = $this->response->withStringBody(json_encode(array_map($mapFunc, $products)));
        $this->response = $this->response->withType('json');
        return $this->response;

    }

    public function getInventoryById($id = null)
    {
        if($this->MyAuth->staffAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $this->loadModel('ColorsProductsSizes');
        $colors_products_sizes= $this->ColorsProductsSizes->find()->contain(['Colors','Sizes'])->where(['product_id' => (int)$id] )->sortBy('size_id',SORT_ASC)->toArray();

        if(!empty($colors_products_sizes) ){
            // debug($colors_products_sizes);

            // debug($colors_products_sizes[0]['size']['name']);
            $sizeObject = array(
                "size" =>array_values($colors_products_sizes)[0]['size']['name'] ,
                "colors" => []
            );
            $sizesArray = [];
            $colorObject = ['color' => '', 'count' => 0];
            $colorsArray = array();
            $current_size = array_values($colors_products_sizes)[0]['size']['name'];
            foreach($colors_products_sizes as $cps) {

                if($current_size != $cps['size']['name']){
                    $sizeObject['colors'] = $colorsArray;
                    array_push($sizesArray,$sizeObject);
                    $colorsArray = array();
                    $current_size = $cps['size']['name'];
                    $sizeObject['colors'] = [];
                    $sizeObject['size']= $cps['size']['name'];

                }
                $colorObject['color'] = $cps['color']['name'];
                $colorObject['count'] = $cps['count'];
                array_push($colorsArray, $colorObject);

                }
                $sizeObject['colors'] = $colorsArray;
                array_push($sizesArray,$sizeObject);
                $colorsArray = array();
                // debug($sizesArray);
                $inventory=  $sizesArray;
                // debug($product);
            }else {
                $inventory = [];
            }
            return  $this->response->withStringBody(json_encode(['inventory' => $inventory]))->withType('json');
    }
    public function getSellList(){
        $this->loadModel('ColorsProductsSizes');
        $this->loadModel("CategoriesProducts");
        $mapFunc = function ( $product) {
            //Add Categories property to $product;
            $categories_products = $this->CategoriesProducts->find()->where(["product_id" => $product["id"]])->contain("Categories")->toArray();
            $categoriesArray = [];

            foreach( $categories_products as $cp){
                $categoryOfProduct= array(
                    'id' => $cp['category']['id'],
                    'name' => $cp['category']['name']
                );
                array_push($categoriesArray, $categoryOfProduct);
            };

            $product['categories']= $categoriesArray;

            $product['manufacturer']= array(
                'id'  => $product["manufacturer"]['id'],
                'name' => $product["manufacturer"]["name"]
            );

            unset($product["manufacturer_id"]);
            return $product;
        };

        $products = $this->Products->find('all')->contain(['Manufacturers'])->where(['state_id IN' =>[1, 2]])->toArray();
        foreach($products as $product){
            $product['image'] = 'http://localhost:8765/img/'.$product['image'];
        }

        $this->response = $this->response->withStringBody(json_encode(array_map($mapFunc, $products)));
        $this->response = $this->response->withType('json');
        return $this->response;
    }




    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $this->loadModel("CategoriesProducts");
        $image = $this->request->getData('image');
        $imageName = $image->getClientFilename();

        $image->moveTo(WWW_ROOT . 'img/' . $imageName);

        $product = $this->Products->newEmptyEntity();
        $product->name = $this->request->getData('name');
        $product->manufacturer_id = (int)$this->request->getData('manufacturer');
        $product->discount = (int)$this->request->getData('discount');
        $product->original_price = (int)$this->request->getData('original_price');
        $product->sell_price = (int)$this->request->getData('sell_price');
        $product->state_id = (int)$this->request->getData('state_id');
        $product->note = $this->request->getData('note');
        $categories = json_decode($this->request->getData('categories'),true);
        $product->image = $imageName;
        $this->Products->save($product);
        $id = $product->id;
        foreach($categories as $category){
            $category_product = $this->CategoriesProducts->newEmptyEntity();
            $category_product->product_id = $id;
            $category_product->category_id = (int)$category;
            $this->CategoriesProducts->save($category_product);
        }


        if($this->Products->save($product)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;

    }

    /**
     * Edit method
     *
     * @param string|null $id Product id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $this->loadModel("CategoriesProducts");
        $id = $this->request->getData('id');
        $product = $this->Products->get((int)$id);
        $old_categories_products = $this->CategoriesProducts->find()->where(["product_id" => $id]);
        $this->CategoriesProducts->deleteMany($old_categories_products);
        $image = $this->request->getData('image');
        if(!empty($image)) {

            unlink(WWW_ROOT . 'img/' . $product->image);
            $imageName = $image->getClientFilename();

            $image->moveTo(WWW_ROOT . 'img/' . $imageName);
            $product->image = $imageName;
        }

        $product->name = $this->request->getData('name');
        $product->manufacturer_id = (int)$this->request->getData('manufacturer');
        $product->discount = (int)$this->request->getData('discount');
        $product->original_price = (int)$this->request->getData('original_price');
        $product->sell_price = (int)$this->request->getData('sell_price');
        $product->state = (int)$this->request->getData('state');
        $product->note = $this->request->getData('note');
        $categories = json_decode($this->request->getData('categories'),true);

        $this->Products->save($product);

        foreach($categories as $category){
            $category_product = $this->CategoriesProducts->newEmptyEntity();
            $category_product->product_id = $id;
            $category_product->category_id = (int)$category;
            $this->CategoriesProducts->save($category_product);
        }


        if($this->Products->save($product)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;

    }
    public function stopSelling($id = null) {
        $product= $this->Products->get($id);
        $product->state_id = 3;
        $this->Products->save($product);
        if($this->Products->save($product)){
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        }else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));

        }
        return $response;

    }
    /**
     * Delete method
     *
     * @param string|null $id Product id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete()
    {
        if($this->MyAuth->managerAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $id = $this->request->getData('id');
        $product = $this->Products->get($id);
        if ($this->Products->delete($product)) {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "success"]));
        } else {
            $response = $this->response->withType('application/json')
                    ->withStringBody(json_encode(['status' => "fail"]));
        }
        return $response;

    }
    public function info($id = null) {

    }

    public function findByKeywordAndManufacturer() {
        if($this->MyAuth->staffAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $keyword = $this->request->getData('keyword');
        $manufacturer_id = $this->request->getData('id');


        $dsn = 'mysql://long7aclass:Long7aclass@@localhost/projectDB';
        ConnectionManager::drop('default');
        ConnectionManager::setConfig('default', ['url' => $dsn]);
        $connection = ConnectionManager::get('default');
        if(is_numeric($keyword)){
            $query = "Select products.id, name,original_price,image,SUM(colors_products_sizes.count) as count
            FROM products, colors_products_sizes
            WHERE manufacturer_id = ?
            AND products.id = ?
            AND products.id = colors_products_sizes.product_id
            GROUP BY products.id";
            $result = $connection->execute($query,[(int)$manufacturer_id,(int)$keyword])->fetchAll('assoc');
        }
        else {
            $query = "Select products.id, name,original_price,image,SUM(colors_products_sizes.count) as count
            FROM products, colors_products_sizes
            WHERE manufacturer_id = ?
            AND name LIKE ?
            AND products.id = colors_products_sizes.product_id
            GROUP BY products.id";
            $result = $connection->execute($query,[(int)$manufacturer_id, "%".$keyword."%"])->fetchAll('assoc');
            }

        $this->response = $this->response->withStringBody(json_encode( $result));
        $this->response = $this->response->withType('json');
        return $this->response;
    }
    public function findByKeyword() {
        if($this->MyAuth->staffAuth() === false){
            return $this->response->withStringBody(json_encode(['status' => "fail"]))->withType('json');
        }
        $keyword = $this->request->getData('keyword');
        if(is_numeric($keyword)){
            $result = $this->Products->find('all')->select(['id','name', 'sell_price', 'image'])->where(['OR'=> [['id LIKE' => '%'.(int)$keyword.'%'], ['name LIKE' => '%'.$keyword.'%' ]]])->toArray();
            return $this->response->withStringBody(json_encode($result))->withType('json');
        }else {
            $result = $this->Products->find('all')->select(['id','name', 'sell_price', 'image'])->where(['name LIKE' => '%'.$keyword.'%' ])->toArray();
            return $this->response->y(json_encode($result))->withType('json');

        }
    }
 }





