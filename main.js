//名前
let name = prompt("名前を入力してください");
let flag = true;
//プレイヤーデータ
let St = 1;
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtk = 2;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 4;
let plyExpNeed = 4;
let plyImg = document.getElementById("plyImg");
let plyid = new Array(7);
for (i = 0; i < plyid.length; i++) {
    let plySt = document.getElementById(plyid[i]);
}
plySt0.textContent = name;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
    if(flag) {
        plyImg.src = "img/playerC.png";
    }
});
plyImg.addEventListener("mouseup", () => {
    if(flag) {
        plyImg.src = "img/playerA.png";
        plyHp += plyHeal;
        if(plyHp > plyHpMax) {
            plyHp = plyHpMax;
        }
        plySt2.textContent = "HP:" + plyHp;
    }
});
//敵のデータ
let j = 0;
let eneLv = 1;
let eneHp = 10;
let eneHpMax = [10,24,36,48,60,70,84,108,120,280,1000];
let eneAtk = [1,2,4,9,3,5,10,15,20,25,50];
let eneKill = [0,0,0,0,0,0,0,0,0,0]
let eneExp = [1,3,6,9,10,13,15,20,35,50];
let eneCnt = 3;
let eneCntmax = [3,2,2,3,1,5,2,8,5,10,10];
let eneName = ["スライム","コウモリ","ネズミ","マムシ","オオカミ","ミニゴブリン","ゴースト","フランケンシュタイン","ウィルオウィスプ","爪熊","魔王",]
let eneImg = document.getElementById("eneImg");
let eneid = new Array(5);
for (i = 0; i < 5; i++) {
    let eneSt = document.getElementById(eneid[i]);
};
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
    if (flag) {
        eneImg.src = "img/enemyB" + j + ".png";
    }
});
eneImg.addEventListener("mouseup", () => {
    if (flag) {
        eneImg.src = "img/enemyA" + j + ".png";
        if (eneHp > 1) {
            eneHp -= plyAtk;
        } else {
            eneHp = eneHpMax[j];
            eneSt2.textContent = "HP:" + eneHp;
            eneKill[j]++;
            eneSt4.textContent = "倒した回数:" + eneKill[j];
            //経験値
            plyExp += eneExp[j];
            plySt5.textContent = "経験値:" + plyExp;
            plyExpNext -= eneExp[j];
            //レベルアップ
            if (plyExpNext < 1) {
                plyExpNext = plyLv * 15;
                plyLv++;
                plySt1.textContent = "レベル:" + plyLv;
                if (St == 1) {
                    plyHpMax = (plyLv - 1) * 8 + 6;
                    plyHp = plyHpMax;
                    plyAtk = plyLv * 2;
                    plyHeal = 1;
                } else {
                    plyHpMax = (plyLv - 1) * 8 + 6;
                    plyHp = plyHpMax;
                    plyAtk = plyLv * 2;
                    plyHeal = 1; 
                }
            }
            //クリア
            if(j == 10) {
                eneImg.src = "img/clear.png";
                clearInterval(loop);
                flag = false;
                eneSec.textContent = "魔王討伐おめでとう！世界は救われた...";
            }
        }
        plySt2.textContent = "HP:" + plyHp;
        plySt3.textContent = "攻撃力:" + plyAtk;
        plySt4.textContent = "回復魔法:" + plyHeal;
        plySt6.textContent = "次のレベルまでの経験値:" + plyExpNext + "ポイント";
        eneSt2.textContent = "HP:" + eneHp;
    }    
});
//敵の攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
    if (eneCnt > 0) {
        eneCnt--;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
        plyImg.src = "img/playerB.png";
        plyHp -= eneAtk[j];
        if (plyHp > 0) {
            plySt2.textContent = "HP:" + plyHp;
            eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
        } else {
            plyHp = 0;
            clearInterval(loop);
            plySt2.textContent = "HP" + plyHp;
            eneSec.textContent = "GAMEOVER";
            flag = false;
        }
        setTimeout(() => {
            if (flag) {
                eneCnt = eneCntmax[j];
                plyImg.src = "img/playerA.png";
                eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
            }
        },500);
    }
}, 1000);
//次の敵
let right = document.getElementById("right");
right.addEventListener("click", () =>{
    if(flag) {
        if (j < 11) {
            j++;
            eneImg.src = "img/enemyA" + j + ".png";
            eneLv++;
            eneHp = eneHpMax[j];
            eneSt0.textContent = eneName[j];
            eneSt1.textContent = "レベル:" + eneLv;
            eneSt2.textContent = "HP:" + eneHp;
            eneSt3.textContent = "攻撃力" + eneAtk[j];
            eneSt4.textContent = "倒した回数:" + eneKill[j];
        }
    }
});
//逃げる
let left = document.getElementById("left");
left.addEventListener("click", () =>{
    if(flag) {
        if (j > 0) {
            j--;
            eneImg.src = "img/enemyA" + j + ".png";
            eneHp = eneHpMax[j];
            eneSt0.textContent = eneName[j];
            eneSt1.textContent = "レベル:" + eneLv;
            eneSt2.textContent = "HP:" + eneHp;
            eneSt3.textContent = "攻撃力" + eneAtk[j];
            eneSt4.textContent = "倒した回数:" + eneKill[j];
        }
    }
});
