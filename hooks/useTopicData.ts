
import React, { useState, useCallback } from 'react';
import { Topic } from '../types';
import { BiomeIcon, DengueIcon, SchistoIcon } from '../components/Icons';

const INITIAL_TOPICS: Topic[] = [
    {
      id: 'biomas',
      title: 'Biomas Brasileiros',
      description: 'Explore a incrível diversidade dos ecossistemas do Brasil.',
      icon: React.createElement(BiomeIcon),
      color: 'bg-green-500',
      content: {
        introduction: 'O Brasil é um país de dimensões continentais, abrigando uma enorme diversidade de paisagens, climas, e seres vivos. Essa riqueza é organizada em grandes ecossistemas chamados Biomas. Vamos conhecer os seis biomas brasileiros!',
        sections: [
          {
            title: 'Amazônia',
            text: 'A maior floresta tropical do mundo, com rios gigantes e uma biodiversidade inigualável. É o lar de milhões de espécies de plantas e animais.',
            image: 'https://picsum.photos/seed/amazonia/600/400'
          },
          {
            title: 'Mata Atlântica',
            text: 'Uma floresta que originalmente se estendia por quase toda a costa brasileira. Hoje, restam apenas fragmentos, mas ainda é muito rica em espécies únicas.',
            image: 'https://picsum.photos/seed/mataatlantica/600/400'
          },
          {
              title: 'Cerrado',
              text: 'Conhecido como a savana brasileira, o Cerrado tem árvores tortuosas, campos abertos e uma biodiversidade surpreendente, adaptada ao fogo e à seca.',
              image: 'https://picsum.photos/seed/cerrado/600/400'
          },
          {
              title: 'Caatinga',
              text: 'O único bioma exclusivamente brasileiro, adaptado ao clima semiárido. Suas plantas e animais têm incríveis estratégias para sobreviver com pouca água.',
              image: 'https://picsum.photos/seed/caatinga/600/400'
          },
          {
              title: 'Pampa',
              text: 'Localizado no sul do país, o Pampa é caracterizado por suas vastas planícies de campos, com uma vegetação de gramíneas e um relevo suave.',
              image: 'https://picsum.photos/seed/pampa/600/400'
          },
          {
              title: 'Pantanal',
              text: 'A maior planície inundável do planeta. Seu cenário muda drasticamente entre a estação seca e a chuvosa, atraindo uma fauna exuberante.',
              image: 'https://picsum.photos/seed/pantanal/600/400'
          }
        ]
      }
    },
    {
      id: 'dengue-zika-chik',
      title: 'Dengue, Zika e Chikungunya',
      description: 'Aprenda a se proteger do mosquito Aedes aegypti.',
      icon: React.createElement(DengueIcon),
      color: 'bg-red-500',
      content: {
          introduction: 'Dengue, Zika e Chikungunya são doenças (arboviroses) causadas por vírus e transmitidas principalmente pela picada do mosquito Aedes aegypti. Embora tenham sintomas parecidos, é importante saber diferenciá-las e, principalmente, como preveni-las.',
          sections: [
            {
              title: 'O Transmissor: Aedes aegypti',
              text: 'Este mosquito se prolifera em água parada. A fêmea pica para se alimentar de sangue e, se estiver infectada, transmite o vírus. Eliminar criadouros é a principal forma de prevenção.',
              image: 'https://picsum.photos/seed/aedes/600/400'
            },
            {
              title: 'Sintomas e Diferenças',
              text: 'Dengue: febre alta, dor de cabeça e muscular, dor atrás dos olhos e manchas vermelhas. Zika: febre mais baixa, coceira intensa e olhos vermelhos. Chikungunya: febre alta e dores intensas e incapacitantes nas articulações.',
            },
            {
              title: 'Prevenção é o Melhor Remédio',
              text: 'Não deixe água acumulada em pneus, vasos de plantas, garrafas e caixas d\'água. Use repelente, instale telas em janelas e portas e mantenha o lixo bem fechado. A luta contra o mosquito é responsabilidade de todos!',
              image: 'https://picsum.photos/seed/prevencao/600/400'
            }
          ]
      }
    },
    {
      id: 'esquistossomose',
      title: 'Esquistossomose',
      description: 'Conheça a "barriga d\'água" e como evitar essa doença.',
      icon: React.createElement(SchistoIcon),
      color: 'bg-blue-500',
      content: {
          introduction: 'A esquistossomose, também conhecida como "barriga d\'água" ou doença do caramujo, é uma doença parasitária causada pelo verme Schistosoma mansoni. A infecção ocorre em humanos através do contato com água doce contaminada.',
          sections: [
            {
              title: 'O Ciclo da Doença',
              text: 'Pessoas infectadas eliminam os ovos do verme nas fezes. Se as fezes contaminam a água, os ovos liberam larvas que infectam caramujos. Nos caramujos, as larvas se desenvolvem e voltam para a água, prontas para penetrar na pele humana.',
              image: 'https://picsum.photos/seed/ciclo/600/400'
            },
            {
              title: 'Sintomas e Consequências',
              text: 'Na fase aguda, pode haver febre, dores de cabeça e calafrios. Na fase crônica, a doença pode causar problemas graves no fígado e no baço, levando ao inchaço da barriga, característico da doença.',
            },
            {
              title: 'Como se Prevenir',
              text: 'A principal forma de prevenção é evitar o contato com águas de rios, lagos e córregos que possam estar contaminados, especialmente em locais sem saneamento básico. O tratamento de esgoto é fundamental para quebrar o ciclo da doença.',
              image: 'https://picsum.photos/seed/saneamento/600/400'
            }
          ]
      }
    },
];

export const useTopicData = () => {
    const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);

    const addTopic = useCallback((newTopic: Omit<Topic, 'id' | 'icon'>) => {
        const topic: Topic = {
            ...newTopic,
            id: `topic-${Date.now()}`,
            // For simplicity, assign a default icon. A real app might have a selector.
            icon: React.createElement(BiomeIcon),
        };
        setTopics(currentTopics => [topic, ...currentTopics]);
    }, []);

    const updateTopic = useCallback((updatedTopic: Topic) => {
        setTopics(currentTopics =>
            currentTopics.map(topic =>
                topic.id === updatedTopic.id ? updatedTopic : topic
            )
        );
    }, []);

    const deleteTopic = useCallback((topicId: string) => {
        setTopics(currentTopics =>
            currentTopics.filter(topic => topic.id !== topicId)
        );
    }, []);

    return {
        topics,
        addTopic,
        updateTopic,
        deleteTopic,
    };
};
