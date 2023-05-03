# TRABALHO DE ALGORITMOS EM GRAFO

O objetivo deste trabalho é projetar, desenvolver e validar uma biblioteca para manipular grafos. A biblioteca deve ser capaz de representar grafos, assim como implementar um conjunto de algoritmos em grafos. A implementação dessa biblioteca pode ser por meio de um conjunto de funções (em C, por exemplo) ou uma classe em uma linguagem orientada a objetos (em C++ ou Java, por exemplo). Você deve projetar e desenvolver sua biblioteca de forma que ela possa ser facilmente utilizada em outros programas. O trabalho deverá ser realizado em dupla.

Para entregar o trabalho, a dupla irá preparar um relatório informando suas decisões de projeto e implementação das funcionalidades. Além disso, o relatório deve responder às perguntas relacionadas ao estudo de caso, descritos mais adiante. Este relatório deve ter no máximo 5 páginas e será entregue juntamente com o código fonte da biblioteca e do programa utilizado para realizar o estudo de caso. Além disso, o trabalho será apresentado em aula pela dupla. A apresentação deve ter em torno de 10 minutos e deve explicar as decisões de projeto e implementação que foram tomadas.

## Descrição da primeira parte do trabalho

Seguem abaixo as funcionalidades que precisam ser oferecidas pela biblioteca na primeira parte do trabalho. Sua biblioteca irá trabalhar apenas com grafos não-direcionados e arestas sem peso, como mostrado na figura 1 ou com grafos não-direcionados e arestas com peso, como mostrado na figura 2.

Nota: o enunciado deste trabalho foi adaptado do material de aulas dos professores Celina Figueiredo e Ricardo Marroquim.

![figura1](https://user-images.githubusercontent.com/15125899/236040142-9d1432e5-f0e4-4945-8227-b5f8d5b17ad2.png)

![figura2](https://user-images.githubusercontent.com/15125899/236040254-81d71389-aecc-409d-9c87-801435ca629a.png)

Nota: o enunciado deste trabalho foi adaptado do material de aulas dos professores Celina Figueiredo e Ricardo Marroquim.

O arquivo de entrada será único e terá a forma como mostrado na figura 2. Para os casos onde os pesos não são necessários, será possível ignorar a informação da terceira coluna.

1. Entrada
A biblioteca deve ser capaz de ler um grafo a partir de um arquivo texto. O formato do grafo no arquivo será o seguinte. A primeira linha informa o número de vértices do grafo. Cada linha subsequente informa as arestas. Um exemplo de um grafo e seu respectivo arquivo texto é dado na figura 1.

2. Saída
Sua biblioteca deve ser capaz de gerar um arquivo texto com as seguintes informações sobre o grafo: número de vértices, número de arestas, grau médio, e distribuição empírica do grau dos vértices. A Figura 1 ilustra o formato deste arquivo de saída para o grafo correspondente.

3. Representação de grafos
Sua biblioteca deve ser capaz de representar grafos utilizando tanto uma matriz de adjacência quanto uma lista de adjacência. O usuário da biblioteca (programa que irá usá-la) poderá escolher a representação a ser utilizada.

4. Busca em grafos: largura e profundidade
Sua biblioteca deve ser capaz de percorrer o grafo utilizando busca em largura e busca em profundidade. O vértice inicial será dado pelo usuário da biblioteca. A respectiva árvore de busca deve ser gerada, assim como o nível de cada vértice na árvore (nível da raiz é zero). Estas informações devem ser impressas em um arquivo. Para descrever a árvore gerada, basta informar o pai de cada vértice e seu nível no arquivo de saída.

5. Componentes conexos
Sua biblioteca deve ser capaz de descobrir os componentes conexos de um grafo. O número de componentes conexas, assim como o tamanho (em vértices) de cada componente e a lista de vértices pertencentes à componente. Os componentes devem estar listados em ordem decrescente de tamanho (listar primeiro os componentes maiores).

## Descrição da segunda parte do trabalho

Esta é a segunda parte do trabalho prático da disciplina. Você deve realizar esta parte utilizando a biblioteca implementada na primeira parte. Se você fez a primeira parte em dupla, então a dupla deve continuar a mesma. Para entregar o trabalho, prepare um relatório informando suas decisões de projeto e implementação das funcionalidades. Além disso, o relatório deve responder às perguntas relacionadas aos estudos de caso, descritos mais adiante. Este relatório deve ter no máximo 5 páginas e será entregue juntamente com o código fonte da biblioteca e do programa utilizado para realizar os estudos de caso. Além disso, o trabalho será apresentado em aula pela dupla. A apresentação deve ter em torno de 10 minutos e deve explicar as decisões de projeto e implementação que foram tomadas.

O que segue são as funcionalidades que precisam ser implementadas pela sua biblioteca de grafos para a segunda parte do trabalho.

1. **Grafos com pesos**. Sua biblioteca deve ser capaz de representar e manipular grafos não-direcionados que possuam pesos nas arestas. Os pesos, que serão representados por valores reais, devem estar associados às arestas. Você deve decidir a melhor forma de estender sua biblioteca de forma a implementar esta nova funcionalidade. O arquivo de entrada será modificado, tendo agora uma terceira coluna, que representa o peso da aresta (podendo ser qualquer número de ponto flutuante). Um exemplo de grafo não-direcionado com pesos e seu respectivo arquivo de entrada está ilustrado na figura abaixo.

2. **Distância e caminho mínimo**. Sua biblioteca deve ser capaz de encontrar a distância entre qualquer par de vértices assim como o caminho que possui esta distância. Se o grafo não possuir pesos, o algoritmo de busca em largura deve ser utilizado. Se o grafo possuir pesos, o algoritmo de Dijkstra deve ser utilizado. Neste último caso, é necessário verificar se os pesos de todas as arestas são maiores ou iguais a zero, condição necessária para que o algoritmo de Dijkstra funcione corretamente. Você deve decidir como implementar o algoritmo de Dijkstra em sua biblioteca (por exemplo, usando um heap), lembrando que isto irá influenciar o tempo de execução do seu algoritmo. Além de calcular a distância e caminho mínimo entre um par de vértices, sua biblioteca deve ser capaz de calcular a distância e caminho mínimo entre um dado vértice e todos os outros vértices do grafo.

3. **Árvore geradora mínima (MST)**. Sua biblioteca deve ser capaz de encontrar uma árvore geradora mínima de um grafo. Você deve escolher um algoritmo apropriado para este problema. A árvore geradora mínima deve ser escrita em um arquivo (no mesmo formato que um grafo), assim como seu peso total.

4. **Distância média**. Sua biblioteca deve encontrar a distância média de um dado grafo. A distância média de um grafo é a média das distâncias entre todos os pares (não-ordenados) de vértices do grafo. Ou seja, se d(u, v) é a distância entre os vértices u e v, então a fórmula para o cálculo da distância média de um grafo é a apresentada abaixo. Note que, se não há caminho entre u e v, ou seja, d(u, v) não é bem definida, então este par de vértices não deve ser considerado no cálculo da média.

![Formula](https://user-images.githubusercontent.com/15125899/236040551-c07cf60c-dc08-4ded-bd7c-9474b5b6f014.png)

## Estudo de caso

Considere os grafos não-direcionados com pesos disponíveis no Moodle da disciplina. Para cada grafo, responda às perguntas abaixo.

1. Calcule a distância e o menor caminho a partir do vértice 1 para os vértices 10, 100, 1000, 10000. 

2. Calcule a distância média do grafo.

3. Obtenha uma árvore geradora mínima, informando seu peso.

4. Faça uma discussão dos resultados observados. 
